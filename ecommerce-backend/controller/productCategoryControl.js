const ProductCategory = require("../models/productCategoryModel");
const asyncHandler = require("express-async-handler");
const validateMongodbId = require("../utils/validateMongodbId");

const createProductCategory = asyncHandler(async (req, res) => {
    try {
        const newCategory = await ProductCategory.create(req.body);
        res.json(newCategory);
    } catch (error) {
        throw new Error(error);
    }
});

const updateProductCategory = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const updateCategory = await ProductCategory.findByIdAndUpdate(
            id,
            req.body,
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
        const getAllCategory = await ProductCategory.find();
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
