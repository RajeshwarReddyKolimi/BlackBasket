const Color = require("../models/colorModel");
const asyncHandler = require("express-async-handler");
const validateMongodbId = require("../utils/validateMongodbId");

const createColor = asyncHandler(async (req, res) => {
    try {
        const newCategory = await Color.create(req.body);
        res.json(newCategory);
    } catch (error) {
        throw new Error(error);
    }
});

const updateColor = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const updateCategory = await Color.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        res.json(updateCategory);
    } catch (error) {
        throw new Error(error);
    }
});

const deleteColor = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const deleteCategory = await Color.findByIdAndDelete(id);
        res.json(deleteCategory);
    } catch (error) {
        throw new Error(error);
    }
});

const getColor = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const getCategory = await Color.findById(id);
        res.json(getCategory);
    } catch (error) {
        throw new Error(error);
    }
});

const getAllColor = asyncHandler(async (req, res) => {
    try {
        const getAllCategory = await Color.find();
        res.json(getAllCategory);
    } catch (error) {
        throw new Error(error);
    }
});

module.exports = {
    createColor,
    updateColor,
    deleteColor,
    getColor,
    getAllColor,
};
