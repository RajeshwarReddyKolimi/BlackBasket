const mongoose = require("mongoose");
const productSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        slug: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },
        description: {
            type: String,
            required: true,
        },
        originalPrice: {
            type: Number,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        discount: {
            type: Number,
        },
        category: {
            type: String,
            required: true,
        },
        brand: {
            type: String,
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
        sold: {
            type: Number,
            default: 0,
        },
        images: [],
        color: String,
        tags: [],
        ratings: [
            {
                star: Number,
                comment: String,
                postedby: {
                    userId: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: "User",
                    },
                    userName: String,
                },
                date: {
                    type: Date,
                },
            },
        ],
        totalrating: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true }
);

productSchema.pre("save", async function (next) {
    this.discount =
        ((this.originalPrice - this.price) / this.originalPrice) * 100;
    next();
});

module.exports = mongoose.model("Product", productSchema);
