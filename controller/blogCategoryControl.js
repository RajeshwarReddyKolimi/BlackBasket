const BlogCategory = require("../models/blogCategoryModel");
const asyncHandler = require("express-async-handler");
const validateMongodbId = require("../utils/validateMongodbId");

const createBlogCategory = asyncHandler(async (req, res) => {
    try {
        const newCategory = await BlogCategory.create(req.body);
        res.json(newCategory);
    } catch (error) {
        throw new Error(error);
    }
});

const updateBlogCategory = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const updateCategory = await BlogCategory.findByIdAndUpdate(
            id,
            req.body,
            { new: true }
        );
        res.json(updateCategory);
    } catch (error) {
        throw new Error(error);
    }
});

const deleteBlogCategory = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const deleteCategory = await BlogCategory.findByIdAndDelete(id);
        res.json(deleteCategory);
    } catch (error) {
        throw new Error(error);
    }
});

const getBlogCategory = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const getCategory = await BlogCategory.findById(id);
        res.json(getCategory);
    } catch (error) {
        throw new Error(error);
    }
});

const getAllBlogCategory = asyncHandler(async (req, res) => {
    try {
        const getAllCategory = await BlogCategory.find();
        res.json(getAllCategory);
    } catch (error) {
        throw new Error(error);
    }
});

module.exports = {
    createBlogCategory,
    updateBlogCategory,
    deleteBlogCategory,
    getBlogCategory,
    getAllBlogCategory,
};
