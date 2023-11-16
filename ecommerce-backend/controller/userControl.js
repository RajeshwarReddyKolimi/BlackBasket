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
    const { userDetails } = req.body;
    try {
        const email = userDetails.email;
        const findUser = await User.findOne({ email: email });
        if (!findUser) {
            const newUser = new User(userDetails);
            const coupons = await Coupon.find({});
            newUser.coupons = coupons.map((coupon) => {
                return { coupon: coupon._id, code: coupon.name };
            });
            const updUser = await newUser.save();

            const refreshToken = await generateRefreshToken(newUser._id);
            newUser.refreshToken = refreshToken;
            await newUser.save();
            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: true,
                maxAge: 3 * 24 * 60 * 60 * 1000,
                path: "/",
                sameSite: "None",
            });
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
    try {
        const findUser = await User.findOne({ email });
        if (findUser) {
            const passwordMatched = await findUser.isPasswordMatched(password);
            if (passwordMatched) {
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
                    secure: true,
                    maxAge: 3 * 24 * 60 * 60 * 1000,
                    path: "/",
                    sameSite: "None",
                });

                console.log(res.getHeaders());
                res.json({
                    message: "Success",
                });
            } else throw new Error("Invalid password");
        } else throw new Error("User not found");
    } catch (error) {
        throw new Error(error);
    }
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
    console.log(req.cookies);
    const getUser = await User.findOne(
        { refreshToken },
        {
            _id: 0,
            createdAt: 0,
            updatedAt: 0,
            __v: 0,
            refreshToken: 0,
            password: 0,
        }
    )
        .populate("cart")
        .populate("wishlist")
        .populate("queries.query");
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
    const { _id } = req.user;
    validateMongodbId(_id);
    try {
        const isEmail = await User.findOne({ email: req.body.email });
        if (isEmail && isEmail._id.toString() !== _id.toString()) {
            throw new Error("Email already exists");
            res.status(500);
        }
        const isMobile = await User.findOne({ mobile: req.body.mobile });
        if (isMobile && isMobile._id.toString() !== _id.toString()) {
            throw new Error("Mobile no. already exists");
            res.status(500);
        }
        const updUser = await User.findByIdAndUpdate(
            _id,
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
        res.json(user.cart);
    } catch (error) {
        throw new Error(error);
    }
});
const updateCartItemQuantity = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { productId, value } = req.body;
    validateMongodbId(productId);

    try {
        const user = await User.findById(_id);

        const itemIndex = user.cart.items.findIndex(
            (item) => item.product.toString() === productId
        );

        if (itemIndex === -1) {
            return res
                .status(404)
                .json({ error: "Item not found in the cart" });
        }

        const product = await Product.findById(
            user.cart.items[itemIndex].product
        );
        const updatedQuantity = user.cart.items[itemIndex].quantity + value;
        const totalUpdatedPrice =
            product.price *
            (updatedQuantity - user.cart.items[itemIndex].quantity);

        if (updatedQuantity <= 0) {
            user.cart.items.splice(itemIndex, 1);
        } else {
            user.cart.items[itemIndex].quantity = updatedQuantity;
        }

        user.cart.totalPrice += totalUpdatedPrice;

        await user.save();
        await user.populate("cart.items.product");
        res.json(user.cart);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

const removeFromCart = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { productId } = req.body;
    validateMongodbId(productId);
    try {
        const user = await User.findById(_id);
        const deletedItem = user.cart.items.find(
            (item) => item.product.toString() === productId
        );

        if (deletedItem) {
            const product = await Product.findById(deletedItem.product);
            const totalReducedPrice = product.price * deletedItem.quantity;

            user.cart.items = user.cart.items.filter(
                (item) => item.product.toString() !== productId
            );

            user.cart.totalPrice -= totalReducedPrice;

            await user.save();
            await user.populate("cart.items.product");
            res.json(user.cart);
        } else {
            res.status(404).json({ error: "Item not found in the cart" });
        }
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
const deleteAddress = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { id: addressId } = req.params;
    console.log(addressId);
    validateMongodbId(_id);
    try {
        const updateUser = await User.findByIdAndUpdate(
            _id,
            {
                $pull: { address: { _id: addressId } },
            },
            { new: true }
        );
        res.json(updateUser.address);
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
            {
                $set: {
                    "address.$.userName": address.userName,
                    "address.$.mobile": address.mobile,
                    "address.$.houseNo": address.houseNo,
                    "address.$.street": address.street,
                    "address.$.village": address.village,
                    "address.$.city": address.city,
                    "address.$.landmark": address.landmark,
                    "address.$.pincode": address.pincode,
                },
            }
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
    const { couponCode } = req.body;
    const currentTime = Date.now();
    validateMongodbId(_id);
    try {
        const user = await User.findById(_id);
        const isValidCoupon = user.coupons.find(
            (coupon) => coupon.code === couponCode
        );
        if (!isValidCoupon) throw new Error("Invalid Coupon");
        const coupon = await Coupon.findById(isValidCoupon.coupon);
        if (coupon.expiry < currentTime) throw new Error("Coupon Expired");
        console.log("thrown Error faild");
        const discount = coupon.discount;
        const maxDiscount = coupon.maxDiscount;
        const total = user.cart.totalPrice;
        let currDiscount = (total * discount) / 100;
        if (maxDiscount && maxDiscount < currDiscount)
            currDiscount = maxDiscount;
        const final = total - currDiscount;
        res.json({ discount: currDiscount, finalPrice: final });
    } catch (error) {
        throw new Error(error);
    }
});

const createOrder = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { couponCode, address, finalPrice } = req.body;
    try {
        const user = await User.findById(_id);
        const userCart = await user.cart;
        const products = userCart.items;
        products.forEach(async (item) => {
            await Product.findByIdAndUpdate(item.product.toString(), {
                $inc: { quantity: -item.quantity },
                $inc: { sold: item.quantity },
            });
        });
        const time = Date.now();
        const appliedCoupon = user.coupons.find(
            (coupon) => coupon.code === couponCode
        );
        const order = {
            items: userCart.items,
            coupon: appliedCoupon,
            totalPrice: userCart.totalPrice,
            finalPrice: finalPrice,
            discount: userCart.totalPrice - finalPrice,
            address: address,
            time: time,
        };
        let updatedUser = await User.findByIdAndUpdate(
            _id,
            {
                $push: { orders: order },
                $pull: { coupons: appliedCoupon },
                $set: { cart: { items: [], totalPrice: 0, finalPrice: 0 } },
            },
            { new: true }
        );
        const updatedOrder = await Order.create({
            items: userCart.items,
            coupon: appliedCoupon,
            totalPrice: userCart.totalPrice,
            discount: userCart.totalPrice - finalPrice,
            finalPrice: finalPrice,
            address: address,
            time: time,
            orderedBy: _id,
            orderStatus: "Ordered",
        });
        return res.json({ message: "Success" });
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
});

const getOrders = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    validateMongodbId(_id);
    try {
        const user = await User.findById(_id).populate("orders.items.product");
        user.orders.sort((a, b) => b.time - a.time);
        res.json(user.orders);
    } catch (error) {
        throw new Error(error);
    }
});

const getOrderById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { _id } = req.user;
    validateMongodbId(_id);
    validateMongodbId(id);
    try {
        const user = await User.findById(_id)
            .populate("orders.items.product")
            .populate("orders.coupon.coupon");
        const order = user.orders.find(
            (order) => order._id.toString() === id.toString()
        );
        res.json(order);
    } catch (error) {
        throw new Error(error);
    }
});

const getUserCoupons = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    validateMongodbId(_id);
    try {
        const user = await User.findById(_id).populate("coupons.coupon");
        user.coupons.sort((a, b) => b.coupon.expiry - a.coupon.expiry);
        res.json(user.coupons);
    } catch (error) {
        throw new Error(error);
    }
});

const deleteAccount = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    validateMongodbId(_id);
    const delUser = await User.findByIdAndDelete(_id);
    if (delUser) {
        res.json({ _id });
    } else throw new Error("User not found");
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
    deleteAddress,
    updateAddress,
    getUserCart,
    updateCartItemQuantity,
    removeFromCart,
    emptyCart,
    createOrder,
    getOrders,
    getOrderById,
    applyCoupon,
    getUserCoupons,
    deleteAccount,
};
