const User = require("../models/userModel");
const Product = require("../models/productModel");
const Cart = require("../models/cartModel");
const Coupon = require("../models/couponModel");
const Order = require("../models/orderModel");
const uniqid = require("uniqid");
const asyncHandler = require("express-async-handler");
const { generateToken } = require("../config/jwtToken");
const { validateMongodbId } = require("../utils/validateMongodbId");
const { generateRefreshToken } = require("../config/refreshToken");
const jwt = require("jsonwebtoken");
const { sendEmail } = require("./emailControl");
const crypto = require("crypto");

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

const loginAdmin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const findAdmin = await User.findOne({ email });
    if (findAdmin) {
        if (findAdmin.role !== "Admin") throw new Error("Not Admin");
        if (await findAdmin.isPasswordMatched(password)) {
            const refreshToken = await generateRefreshToken(findAdmin?._id);
            const updateAdmin = await User.findByIdAndUpdate(
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
                _id: findAdmin?._id,
                firstName: findAdmin?.firstName,
                lastName: findAdmin?.lastName,
                email: findAdmin?.email,
                token: generateToken(findAdmin?._id),
            });
        } else throw new Error("Invalid password");
    } else throw new Error("Admin not found");
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

const updatePassword = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { password } = req.body;
    validateMongodbId(_id);
    const user = await User.findById(_id);
    if (password) {
        user.password = password;
        const updatedPassword = await user.save();
        res.json(updatedPassword);
    }
});

const forgotPasswordToken = asyncHandler(async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) throw new Error("User not found with this email");
    try {
        const token = await user.createPasswordResetToken();
        await user.save();
        const resetURL = `Hi, follow this link to reset your password. Valid for 10 min <a href='http://localhost:4000/api/user/reset-password/${token}'>Click Here`;
        const data = {
            to: email,
            text: "Hey User",
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
    const user = await User.findOne({
        passwordResetToken: hashedToken,
        passwordResetExpires: { $gt: Date.now() },
    });
    if (!user) throw new Error("Token Expired, Try again");
    user.password = password;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();
    res.json(user);
});

const getWishlist = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    try {
        const findUser = await User.findById(_id).populate("wishlist");
        res.json(findUser.wishlist);
    } catch (error) {
        throw new Error(error);
    }
});

const saveAddress = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    validateMongodbId(_id);
    try {
        const updateUser = await User.findByIdAndUpdate(
            _id,
            {
                address: req?.body?.address,
            },
            { new: true }
        );
        res.json(updateUser);
    } catch (error) {
        throw new Error(error);
    }
});

const userCart = asyncHandler(async (req, res) => {
    const { cart } = req.body;
    const { _id } = req.user;
    validateMongodbId(_id);
    try {
        let products = [];
        const user = await User.findById(_id);
        const alreadyExistCart = await Cart.findOne({ orderby: user._id });
        if (alreadyExistCart) {
            alreadyExistCart.remove();
        }
        for (let i = 0; i < cart.length; i++) {
            let object = {};
            object.product = cart[i]._id;
            object.count = cart[i].count;
            object.color = cart[i].color;
            let getPrice = await Product.findById(cart[i]._id)
                .select("price")
                .exec();
            object.price = getPrice.price;
            products.push(object);
        }
        let cartTotal = 0;
        for (let i = 0; i < products.length; i++) {
            cartTotal = cartTotal + products[i].price * products[i].count;
        }
        let newCart = await new Cart({
            products,
            cartTotal,
            orderby: user?._id,
        }).save();
        res.json(newCart);
    } catch (error) {
        throw new Error(error);
    }
});

const getUserCart = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    validateMongodbId(_id);
    try {
        const cart = await Cart.findOne({ orderby: _id }).populate(
            "products.product"
        );
        res.json(cart);
    } catch (error) {
        throw new Error(error);
    }
});

const emptyCart = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    validateMongodbId(_id);
    try {
        const user = await User.findOne({ _id });
        const cart = await Cart.findOneAndRemove({ orderby: user._id });
        res.json(cart);
    } catch (error) {
        throw new Error(error);
    }
});

const applyCoupon = asyncHandler(async (req, res) => {
    const { coupon } = req.body;
    const { _id } = req.user;
    try {
        const validCoupon = await Coupon.findOne({ name: coupon });
        if (!validCoupon) throw new Error("Invalid Coupon");
        const user = await User.findOne({ _id });
        let { products, cartTotal } = await Cart.findOne({
            orderby: user._id,
        }).populate("products.product");
        let totalAfterDiscount = (
            cartTotal -
            (cartTotal * validCoupon.discount) / 100
        ).toFixed(2);
        await Cart.findOneAndUpdate(
            { orderby: user._id },
            { totalAfterDiscount },
            { new: true }
        );
        res.json(totalAfterDiscount);
    } catch (error) {
        throw new Error(error);
    }
});

const createOrder = asyncHandler(async (req, res) => {
    const { COD, couponApplied } = req.body;
    const { _id } = req.user;
    validateMongodbId(_id);
    try {
        if (!COD) throw new Error("Create cash Order failed");
        const user = await User.findById(_id);
        let userCart = await Cart.findOne({ orderby: user._id });
        let finalAmount = 0;
        if (couponApplied && userCart.totalAfterDiscount) {
            finalAmount = userCart.totalAfterDiscount;
        } else {
            finalAmount = userCart.cartTotal;
        }
        let newOrder = await new Order({
            products: userCart.products,
            paymentIntent: {
                id: uniqid(),
                method: "COD",
                amount: finalAmount,
                status: "Cash on Delivery",
                ceated: Date.now(),
                currency: "INR",
            },
            orderby: user._id,
            orderStatus: "Cash on Delivery",
        }).save();
        let update = userCart.products.map((item) => {
            return {
                updateOne: {
                    filter: { _id: item.product._id },
                    update: {
                        $inc: { quantity: -item.count, sold: +item.count },
                    },
                },
            };
        });
        const updated = await Product.bulkWrite(update, {});
        res.json({ message: "success" });
    } catch (error) {
        throw new Error(error);
    }
});

const getOrders = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    validateMongodbId(_id);
    try {
        const orders = await Order.findOne({ orderby: _id })
            .populate("products.product")
            .exec();
        res.json(orders);
    } catch (error) {
        throw new Error(error);
    }
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
    updatePassword,
    forgotPasswordToken,
    resetPassword,
    loginAdmin,
    getWishlist,
    saveAddress,
    userCart,
    getUserCart,
    emptyCart,
    applyCoupon,
    createOrder,
    getOrders,
    updateOrderStatus,
};
