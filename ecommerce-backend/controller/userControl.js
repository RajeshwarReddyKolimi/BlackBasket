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

const createUser = asyncHandler(async (req, res) => {
    const email = req.body.email;
    const findUser = await User.findOne({ email: email });
    if (!findUser) {
        const newUser = await User.create(req.body);
        const refreshToken = await generateRefreshToken(newUser._id);
        const updateUser = await User.findByIdAndUpdate(
            newUser.id,
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
                token: refreshToken,
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

const getUserDetails = asyncHandler(async (req, res) => {
    const { refreshToken } = req.cookies;
    const getUser = await User.findOne(
        { refreshToken },
        { _id: 0, createdAt: 0, updatedAt: 0, __v: 0, refreshToken: 0 }
    )
        .populate("cart")
        .populate("wishlist");
    if (getUser) res.json(getUser);
    else throw new Error("User not found");
});

const logoutUser = asyncHandler(async (req, res) => {
    const cookie = req.cookies;
    if (!cookie?.refreshToken) throw new Error("No refresh token in cookies");
    const refreshToken = cookie.refreshToken;
    try {
        const user = await User.findOne({ refreshToken });
        if (!user) {
            res.clearCookie("refreshToken", {
                httpOnly: true,
                secure: true,
            });
            return res.sendStatus(404);
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
        return res.json({ message: "Successful" });
    } catch (error) {
        throw new Error(error);
    }
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

const getUserCart = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    try {
        const user = await User.findById(_id).populate("cart.items.product");
        console.log(user.cart);
        res.json(user.cart);
    } catch (error) {
        throw new Error(error);
    }
});

const removeFromCart = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { productId } = req.body;
    validateMongodbId(productId);
    try {
        const user = await User.findById(_id);
        const deletedItems = user.cart.items.filter(
            (item) => item.product.toString() === productId.toString()
        );

        let totalReducedPrice = 0;
        for (const deletedItem of deletedItems) {
            const product = await Product.findById(deletedItem.product);
            totalReducedPrice += product.price * deletedItem.quantity;
        }

        user.cart.items = user.cart.items.filter(
            (item) => item.product.toString() !== productId.toString()
        );

        user.cart.totalPrice -= totalReducedPrice;

        await user.save();
        await user.populate("cart.items.product");
        res.json(user.cart);
    } catch (error) {
        throw new Error(error);
    }
});

const emptyCart = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    try {
        const user = await User.findByIdAndUpdate(_id, {
            $set: { cart: [] },
        });
        res.json({ message: "Successfully Emptied" });
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

module.exports = {
    createUser,
    loginUser,
    getUserDetails,
    updateUser,
    handleRefreshToken,
    logoutUser,
    updatePassword,
    forgotPasswordToken,
    resetPassword,
    getWishlist,
    saveAddress,
    getUserCart,
    removeFromCart,
    emptyCart,
    createOrder,
    getOrders,
};
