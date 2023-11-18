const ProductCategory = require("../models/productCategoryModel");
const asyncHandler = require("express-async-handler");
const validateMongodbId = require("../utils/validateMongodbId");

const createProductCategory = asyncHandler(async (req, res) => {
    const { name, images } = req.body;
    try {
        let image = "";
        if (images.length !== 0) image = images[0];
        const newCategory = await ProductCategory.create({ name, image });
        res.json(newCategory);
    } catch (error) {
        throw new Error(error);
    }
});

const updateProductCategory = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name, images } = req.body;
    try {
        let image = "";
        if (images.length !== 0) image = images[0];
        const updateCategory = await ProductCategory.findByIdAndUpdate(
            id,
            { name, image },
            { new: true }
        );
        res.json(updateCategory);
    } catch (error) {
        throw new Error(error);
    }
});

const deleteProductCategory = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const deleteCategory = await ProductCategory.findByIdAndDelete(id);
        res.json(deleteCategory);
    } catch (error) {
        throw new Error(error);
    }
});

const getProductCategory = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const getCategory = await ProductCategory.findById(id);
        res.json(getCategory);
    } catch (error) {
        throw new Error(error);
    }
});

const getAllProductCategory = asyncHandler(async (req, res) => {
    try {
        const getAllCategory = await ProductCategory.find().sort({ name: 1 });
        res.json(getAllCategory);
    } catch (error) {
        throw new Error(error);
    }
});

module.exports = {
    createProductCategory,
    updateProductCategory,
    deleteProductCategory,
    getProductCategory,
    getAllProductCategory,
};
