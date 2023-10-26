const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { ObjectId } = require("mongodb");
const crypto = require("crypto");
const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
        },
        lastName: {
            type: String,
        },
        email: {
            type: String,
            unique: true,
        },
        mobile: {
            type: String,
            unique: true,
            match: /^[6-9]\d{9}$/,
        },
        password: {
            type: String,
        },
        isBlocked: {
            type: Boolean,
            default: false,
        },
        role: {
            type: String,
            default: "User",
        },

        cart: {
            items: [
                {
                    product: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: "Product",
                        unique: false,
                    },
                    quantity: Number,
                },
            ],
            totalPrice: { type: Number, default: 0 },
            finalPrice: { type: Number, default: this.totalPrice },
        },

        cartSize: {
            type: Number,
            default: 0,
        },
        address: [
            {
                houseNo: String,
                street: String,
                village: String,
                city: String,
                landmark: String,
                pincode: { type: String, required: true, match: /^\d{6}$/ },
            },
        ],
        wishlist: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
            },
        ],
        wishlistSize: {
            type: Number,
            default: 0,
        },
        refreshToken: {
            type: String,
        },
        coupons: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Coupon",
            },
        ],
        orders: [
            {
                items: [
                    {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: "Products",
                    },
                ],
                coupon: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Coupon",
                },
                finalPrice: Number,
                address: String,
                time: Date,
            },
        ],
        passwordChangedAt: Date,
        passwordResetToken: String,
        passwordResetExpires: Date,
    },
    { timestamps: true }
);

userSchema.pre("save", async function (next) {
    this.cart.finalPrice = this.cart.totalPrice;
    this.cartSize = this.cart.items.length;
    this.wishlistSize = this.wishlist.length;
    if (!this.isModified("password")) {
        next();
    }
    const salt = await bcrypt.genSaltSync(10);
    this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.isPasswordMatched = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.createPasswordResetToken = async function () {
    const resetToken = crypto.randomBytes(32).toString("hex");
    this.passwordResetToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");
    this.passwordResetExpires = Date.now() + 30 * 60 * 1000;
    return resetToken;
};

module.exports = mongoose.model("User", userSchema);
