const User = require("../models/userModel");
const Product = require("../models/productModel");
const Order = require("../models/orderModel");
const Coupon = require("../models/couponModel");
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
    try {
        const findUser = await User.findOne({ email: email });
        if (!findUser) {
            const newUser = new User(req.body);
            const refreshToken = await generateRefreshToken(newUser._id);
            newUser.refreshToken = refreshToken;
            await newUser.save();
            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                maxAge: 3 * 24 * 60 * 60 * 1000,
            });
            console.log(refreshToken);
            res.json({ token: refreshToken });
        } else {
            throw new Error("User already exists");
        }
    } catch (error) {
        console.log("ERROR", error);
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
    try {
        const isEmail = await User.findOne({ email: req.body.email });
        if (isEmail && isEmail._id.toString() !== id.toString()) {
            throw new Error("Email already exists");
            res.status(500);
        }
        const isMobile = await User.findOne({ mobile: req.body.mobile });
        if (isMobile && isMobile._id.toString() !== id.toString()) {
            throw new Error("Mobile no. already exists");
            res.status(500);
        }
        const updUser = await User.findByIdAndUpdate(
            id,
            {
                firstName: req?.body.firstName,
                lastName: req?.body.lastName,
                email: req?.body.email,
                mobile: req?.body.mobile,
            },
            { new: true }
        );
        if (updUser) {
            res.json(updUser);
        } else throw new Error("User not found");
    } catch (error) {
        throw new Error(error);
    }
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

const addAddress = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    validateMongodbId(_id);
    try {
        const updateUser = await User.findByIdAndUpdate(
            _id,
            {
                $push: { address: req?.body?.address },
            },
            { new: true }
        );
        res.json(updateUser);
    } catch (error) {
        throw new Error(error);
    }
});

const updateAddress = asyncHandler(async (req, res) => {
    const addressId = req.params.id;
    const { address } = req.body;
    const { _id } = req.user;
    validateMongodbId(_id);
    validateMongodbId(addressId);
    try {
        const updatedUser = await User.updateOne(
            { _id, "address._id": addressId },
            { $set: { "address.$": address } }
        );
        const user = await User.findById(_id);
        res.json(user);
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
});

const applyCoupon = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const couponId = req.params.id;
    console.log(couponId);
    validateMongodbId(_id);
    validateMongodbId(couponId);
    try {
        const user = await User.findById(_id);
        const isValidCoupon = user.coupons.find(
            (id) => id.toString() === couponId
        );
        if (!isValidCoupon) throw new Error("Invalid Coupon");

        const coupon = await Coupon.findById(couponId);
        const discount = coupon.discount;
        const total = user.cart.totalPrice;
        const final = (total * (100 - discount)) / 100;
        const updatedUser = await User.findByIdAndUpdate(
            _id,
            { $set: { "cart.finalPrice": final } },
            { new: true }
        );
        res.json(updatedUser.cart);
    } catch (error) {
        throw new Error(error);
    }
});

const createOrder = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const couponId = req.body.id;
    try {
        const user = await User.findById(_id);
        const userCart = await user.cart;
        const products = userCart.items;
        console.log(products);
        products.forEach(async (item) => {
            await Product.findByIdAndUpdate(item.product.toString(), {
                $inc: { quantity: -item.quantity },
            });
        });

        const time = Date.now();

        const order = {
            items: userCart.items,
            coupon: couponId,
            finalPrice: userCart.finalPrice,
            address: user.address,
            time: time,
        };
        let updatedUser = await User.findByIdAndUpdate(
            _id,
            {
                $push: { orders: order },
                $pull: { coupons: couponId },
                $set: { cart: { items: [], totalPrice: 0, finalPrice: 0 } },
            },
            { new: true }
        );
        const updatedOrder = await Order.create({
            items: userCart.items,
            orderedBy: _id,
            orderStatus: "Ordered",
            time: time,
        });

        return res.json({ message: "Success" });
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
    addAddress,
    updateAddress,
    getUserCart,
    removeFromCart,
    emptyCart,
    createOrder,
    getOrders,
    applyCoupon,
};
