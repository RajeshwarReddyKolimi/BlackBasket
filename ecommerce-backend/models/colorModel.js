const mongoose = require("mongoose");

var colorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        set: (value) => {
            return value.toUpperCase();
        },
    },
});

module.exports = mongoose.model("Color", colorSchema);
