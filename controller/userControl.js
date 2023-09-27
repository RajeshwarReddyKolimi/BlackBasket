const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const { generateToken } = require("../config/jwtToken");
const { validateMongodbId } = require("../utils/validateMongoDBId");
const { generateRefreshToken } = require("../config/refreshToken");
const jwt = require("jsonwebtoken");

const createUser = asyncHandler(async (req, res) => {
    const email = req.body.email;
    const findUser = await User.findOne({ email: email });
    if (!findUser) {
        const newUser = await User.create(req.body);
        res.json(newUser);
    } else {
        throw new Error("User already exists");
    }
});

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const findUser = await User.findOne({ email });
    if (findUser) {
        if (await findUser.isPasswordMatched(password)) {
            const refreshToken = await generateRefreshToken(findUser?._id);
            const updateUser = await User.findByIdAndUpdate(
                findUser.id,
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
                _id: findUser?._id,
                firstName: findUser?.firstName,
                lastName: findUser?.lastName,
                email: findUser?.email,
                token: generateToken(findUser?._id),
            });
        } else throw new Error("Invalid password");
    } else throw new Error("User not found");
});

const handleRefreshToken = asyncHandler(async (req, res) => {
    const cookie = req.cookies;
    if (!cookie?.refreshToken) throw new Error("No refresh token in cookies");
    const refreshToken = cookie.refreshToken;
    const user = await User.findOne({ refreshToken });
    if (!user) throw new Error("No refresh toke found in db");
    jwt.verify(refreshToken, process.env.JWT_KEY, (err, decoded) => {
        if (err || user.id !== decoded.id)
            throw new Error("Something wrong with refresh token");
        const accessToken = generateToken(user?.id);
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

const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongodbId(id);
    const delUser = await User.findByIdAndDelete(id);
    if (delUser) {
        res.json({ message: "Successfully Deleted" });
    } else throw new Error("User not found");
});

const logoutUser = asyncHandler(async (req, res) => {
    const cookie = req.cookies;
    if (!cookie?.refreshToken) throw new Error("No refresh token in cookies");
    const refreshToken = cookie.refreshToken;
    const user = await User.findOne({ refreshToken });
    if (!user) {
        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: true,
        });
        res.sendStatus(204);
    }
    await User.findOneAndUpdate(
        { refreshToken },
        {
            refreshToken: "",
        }
    );
    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: true,
    });
    res.sendStatus(204);
});

const updateUser = asyncHandler(async (req, res) => {
    const { id } = req.user;
    validateMongodbId(id);
    const updUser = await User.findByIdAndUpdate(
        id,
        {
            firstName: req?.body.firstName,
            lastName: req?.body.lastName,
            email: req?.body.email,
        },
        { new: true }
    );
    if (updUser) {
        res.json(updUser);
    } else throw new Error("User not found");
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

module.exports = {
    createUser,
    loginUser,
    getAllUsers,
    deleteUser,
    getOneUser,
    updateUser,
    blockUser,
    unblockUser,
    handleRefreshToken,
    logoutUser,
};
