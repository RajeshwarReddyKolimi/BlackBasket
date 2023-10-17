const User = require("../models/userModel");
const Product = require("../models/productModel");
const Order = require("../models/orderModel");
const uniqid = require("uniqid");
const asyncHandler = require("express-async-handler");
const { generateToken } = require("../config/jwtToken");
const { validateMongodbId } = require("../utils/validateMongodbId");
const { generateRefreshToken } = require("../config/refreshToken");
const jwt = require("jsonwebtoken");
const { sendEmail } = require("./emailControl");
const crypto = require("crypto");
const Admin = require("../models/adminModel");

const createAdmin = asyncHandler(async (req, res) => {
    const email = req.body.email;
    const findAdmin = await Admin.findOne({ email: email });
    if (!findAdmin) {
        const newAdmin = await Admin.create(req.body);
        const refreshToken = await generateRefreshToken(newAdmin._id);
        const updateAdmin = await Admin.findByIdAndUpdate(
            newAdmin.id,
            {
                refreshToken: refreshToken,
            },
            { new: true }
        );
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            maxAge: 3 * 24 * 60 * 60 * 1000,
        });
        res.json({ token: refreshToken });
    } else {
        throw new Error("Admin already exists");
    }
});

const loginAdmin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const findAdmin = await Admin.findOne({ email });
    if (findAdmin) {
        if (findAdmin.role !== "Admin") throw new Error("Not Admin");
        if (await findAdmin.isPasswordMatched(password)) {
            const refreshToken = await generateRefreshToken(findAdmin?._id);
            const updateAdmin = await Admin.findByIdAndUpdate(
                findAdmin.id,
                {
                    refreshToken: refreshToken,
                },
                { new: true }
            );
            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                maxAge: 3 * 24 * 60 * 60 * 1000,
            });
            res.json({
                token: refreshToken,
            });
        } else throw new Error("Invalid password");
    } else throw new Error("Admin not found");
});

const handleRefreshToken = asyncHandler(async (req, res) => {
    const cookie = req.cookies;
    if (!cookie?.refreshToken) throw new Error("No refresh token in cookies");
    const refreshToken = cookie.refreshToken;
    const admin = await Admin.findOne({ refreshToken });
    if (!admin) throw new Error("No refresh toke found in db");
    jwt.verify(refreshToken, process.env.JWT_KEY, (err, decoded) => {
        if (err || admin.id !== decoded.id)
            throw new Error("Something wrong with refresh token");
        const accessToken = generateToken(admin?.id);
        res.json({ accessToken });
    });
});

const getAllUsers = asyncHandler(async (req, res) => {
    const getUsers = await User.find();
    if (getUsers.length > 0) {
        res.json(getUsers);
    } else throw new Error("No Users found");
});

const getOneUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongodbId(id);
    const getUser = await User.findById(id);
    if (getUser) res.json(getUser);
    else throw new Error("User not found");
});

const getAdminDetails = asyncHandler(async (req, res) => {
    const { refreshToken } = req.cookies;
    if (!refreshToken) throw new Error("No token found");

    try {
        const getAdmin = await Admin.findOne(
            { refreshToken },
            {
                _id: 0,
                createdAt: 0,
                updatedAt: 0,
                __v: 0,
                refreshToken: 0,
                password: 0,
            }
        );
        if (getAdmin) res.json(getAdmin);
    } catch (error) {
        throw new Error("Admin not found");
    }
});

const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongodbId(id);
    const delUser = await User.findByIdAndDelete(id);
    if (delUser) {
        res.json({ message: "Successfully Deleted" });
    } else throw new Error("User not found");
});

const logoutAdmin = asyncHandler(async (req, res) => {
    const cookie = req.cookies;
    if (!cookie?.refreshToken) throw new Error("No refresh token in cookies");
    const refreshToken = cookie.refreshToken;
    try {
        const admin = await Admin.findOne({ refreshToken });
        if (!admin) {
            res.clearCookie("refreshToken", {
                httpOnly: true,
                secure: true,
            });
            return res.sendStatus(404);
        }
        await Admin.findOneAndUpdate(
            { refreshToken },
            {
                refreshToken: "",
            }
        );
        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: true,
        });
        return res.json({ message: "Successful" });
    } catch (error) {
        throw new Error(error);
    }
});

const updateAdmin = asyncHandler(async (req, res) => {
    const { id } = req.admin;
    validateMongodbId(id);
    const updAdmin = await Admin.findByIdAndUpdate(
        id,
        {
            firstName: req?.body.firstName,
            lastName: req?.body.lastName,
            email: req?.body.email,
        },
        { new: true }
    );
    if (updAdmin) {
        res.json(updAdmin);
    } else throw new Error("Admin not found");
});

const blockUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongodbId(id);
    const block = await User.findByIdAndUpdate(
        id,
        {
            isBlocked: true,
        },
        { new: true }
    );
    if (block) {
        res.json({ message: "User blocked" });
    } else throw new Error("User not found");
});

const unblockUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongodbId(id);
    const unblock = await User.findByIdAndUpdate(
        id,
        {
            isBlocked: false,
        },
        { new: true }
    );
    if (unblock) {
        res.json({ message: "User unblocked" });
    } else throw new Error("User not found");
});

const updatePassword = asyncHandler(async (req, res) => {
    const { _id } = req.admin;
    const { password } = req.body;
    validateMongodbId(_id);
    const admin = await Admin.findById(_id);
    if (password) {
        admin.password = password;
        const updatedPassword = await admin.save();
        res.json(updatedPassword);
    }
});

const forgotPasswordToken = asyncHandler(async (req, res) => {
    const { email } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin) throw new Error("Admin not found with this email");
    try {
        const token = await Admin.createPasswordResetToken();
        await admin.save();
        const resetURL = `Hi, follow this link to reset your password. Valid for 10 min <a href='http://localhost:4000/api/admin/reset-password/${token}'>Click Here`;
        const data = {
            to: email,
            text: "Hey Admin",
            subjectL: "Forgot password link",
            html: resetURL,
        };
        sendEmail(data);
        res.json(token);
    } catch (error) {
        throw new Error(error);
    }
});

const resetPassword = asyncHandler(async (req, res) => {
    const { password } = req.body;
    const { token } = req.params;
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
    console.log(password, token, hashedToken);
    const admin = await Admin.findOne({
        passwordResetToken: hashedToken,
        passwordResetExpires: { $gt: Date.now() },
    });
    if (!admin) throw new Error("Token Expired, Try again");
    admin.password = password;
    admin.passwordResetToken = undefined;
    admin.passwordResetExpires = undefined;
    await admin.save();
    res.json(admin);
});

const updateOrderStatus = asyncHandler(async (req, res) => {
    const { status } = req.body;
    const { id } = req.params;
    validateMongodbId(id);
    try {
        const updateStatus = await Order.findByIdAndUpdate(
            id,
            {
                orderStatus: status,
                paymentIntent: {
                    status: status,
                },
            },
            {
                new: true,
            }
        );
        res.json(updateStatus);
    } catch (error) {
        throw new Error(error);
    }
});

module.exports = {
    createAdmin,
    loginAdmin,
    getAllUsers,
    deleteUser,
    getOneUser,
    getAdminDetails,
    updateAdmin,
    blockUser,
    unblockUser,
    handleRefreshToken,
    logoutAdmin,
    updatePassword,
    forgotPasswordToken,
    resetPassword,
    loginAdmin,
    updateOrderStatus,
};
