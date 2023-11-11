const mongoose = require("mongoose");

var orderSchema = new mongoose.Schema(
    {
        items: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product",
                },
                quantity: Number,
            },
        ],
        paymentIntent: {},
        orderStatus: {
            type: String,
            default: "Not Processed",
            enum: [
                "Not Processed",
                "Ordered",
                "Processing",
                "Cancelled",
                "Delivered",
            ],
        },
        address: String,
        orderedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        totalPrice: Number,
        finalPrice: Number,
        discount: {
            type: Number,
            default: 0,
        },
        coupon: {
            id: { type: mongoose.Schema.Types.ObjectId, ref: "Coupon" },
            code: String,
        },
        time: Date,
    },
    { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
