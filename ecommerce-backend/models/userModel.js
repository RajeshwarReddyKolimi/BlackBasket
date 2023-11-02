const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { ObjectId } = require("mongodb");
const crypto = require("crypto");
const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            unique: true,
            required: true,
        },
        mobile: {
            type: String,
            unique: true,
            required: true,
            match: /^[6-9]\d{9}$/,
        },
        password: {
            type: String,
            required: true,
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
                coupon: { type: mongoose.Schema.Types.ObjectId, ref: "Coupon" },
                code: String,
            },
        ],
        orders: [
            {
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
                coupon: {
                    coupon: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: "Coupon",
                    },
                    code: String,
                },
                totalPrice: Number,
                finalPrice: Number,
                address: {},
                time: Date,
            },
        ],
        queries: [
            {
                subject: {
                    type: String,
                    required: true,
                },
                description: {
                    type: String,
                    required: true,
                },
                status: {
                    type: String,
                    default: "Submitted",
                    enum: ["Submitted", "Resolved", "Contacted", "In Progress"],
                },
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
