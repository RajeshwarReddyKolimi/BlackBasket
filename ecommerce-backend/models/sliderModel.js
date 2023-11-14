const mongoose = require("mongoose");
const sliderSchema = new mongoose.Schema({
    first: String,
    second: String,
    third: String,
    color: String,
    image: String,
    link: String,
});

module.exports = mongoose.model("Slider", sliderSchema);
