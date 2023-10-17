const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { ObjectId } = require("mongodb");
const crypto = require("crypto");
const adminSchema = new mongoose.Schema(
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
        password: {
            type: String,
        },
        role: {
            type: String,
            default: "Admin",
        },
        refreshToken: {
            type: String,
        },
        passwordChangedAt: Date,
        passwordResetToken: String,
        passwordResetExpires: Date,
    },
    { timestamps: true }
);

adminSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    const salt = await bcrypt.genSaltSync(10);
    this.password = await bcrypt.hash(this.password, salt);
});

adminSchema.methods.isPasswordMatched = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

adminSchema.methods.createPasswordResetToken = async function () {
    const resetToken = crypto.randomBytes(32).toString("hex");
    this.passwordResetToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");
    this.passwordResetExpires = Date.now() + 30 * 60 * 1000;
    return resetToken;
};

module.exports = mongoose.model("Admin", adminSchema);
