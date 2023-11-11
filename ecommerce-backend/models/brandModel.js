const mongoose = require("mongoose");

var brandSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            set: (value) => {
                return value.toUpperCase();
            },
        },
        logo: {
            type: String,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Brand", brandSchema);
