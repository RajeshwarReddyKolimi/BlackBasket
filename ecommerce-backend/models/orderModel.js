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
        orderedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        totalPrice: Number,
        finalPrice: Number,
        coupon: {
            id: { type: mongoose.Schema.Types.ObjectId, ref: "Coupon" },
            code: String,
        },
        time: Date,
    },
    { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
