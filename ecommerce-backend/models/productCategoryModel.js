const mongoose = require("mongoose");

var productCategorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            set: (value) => {
                return value.toUpperCase();
            },
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("ProductCategory", productCategorySchema);
