const Brand = require("../models/brandModel");
const asyncHandler = require("express-async-handler");
const validateMongodbId = require("../utils/validateMongodbId");

const createBrand = asyncHandler(async (req, res) => {
    const { name, images } = req.body;
    try {
        let image = "";
        if (images.length !== 0) image = images[0];
        const newBrand = await Brand.create({ name, image });
        res.json(newBrand);
    } catch (error) {
        throw new Error(error);
    }
});

const updateBrand = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name, images } = req.body;
    try {
        let logo = "";
        if (images.length !== 0) logo = images[0];
        const updateBrand = await Brand.findByIdAndUpdate(
            id,
            { name, logo },
            { new: true }
        );
        res.json(updateBrand);
    } catch (error) {
        throw new Error(error);
    }
});

const deleteBrand = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const deleteCategory = await Brand.findByIdAndDelete(id);
        res.json(deleteCategory);
    } catch (error) {
        throw new Error(error);
    }
});

const getBrand = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const getCategory = await Brand.findById(id);
        res.json(getCategory);
    } catch (error) {
        throw new Error(error);
    }
});

const getAllBrand = asyncHandler(async (req, res) => {
    try {
        const getAllCategory = await Brand.find();
        res.json(getAllCategory);
    } catch (error) {
        throw new Error(error);
    }
});

module.exports = {
    createBrand,
    updateBrand,
    deleteBrand,
    getBrand,
    getAllBrand,
};
