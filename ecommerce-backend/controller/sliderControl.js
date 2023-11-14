const Slider = require("../models/sliderModel");
const asyncHandler = require("express-async-handler");
const { validateMongodbId } = require("../utils/validateMongodbId");

const createSlider = asyncHandler(async (req, res) => {
    const { first, second, third, images, color, link } = req.body;
    try {
        const newSlider = await Slider.create({
            first,
            second,
            third,
            color,
            link,
            image: images && images[0] ? images[0] : "",
        });
        res.json(newSlider);
    } catch (error) {
        throw new Error(error);
    }
});

const getSliders = asyncHandler(async (req, res) => {
    try {
        const getSliders = await Slider.find();
        res.json(getSliders);
    } catch (error) {
        throw new Error(error);
    }
});

const updateSlider = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongodbId(id);
    const { first, second, third, images, color, link } = req.body;
    try {
        const updSlider = await Slider.findByIdAndUpdate(
            id,
            {
                first,
                second,
                third,
                color,
                link,
                image: images && images[0] ? images[0] : "",
            },
            {
                new: true,
            }
        );
        res.json(updSlider);
    } catch (error) {
        throw new Error(error);
    }
});

const deleteSlider = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongodbId(id);
    try {
        const delSlider = await Slider.findByIdAndDelete(id);
        res.json(delSlider);
    } catch (error) {
        throw new Error(error);
    }
});

module.exports = {
    createSlider,
    updateSlider,
    getSliders,
    deleteSlider,
};
