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
        time: Date,
    },
    { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
