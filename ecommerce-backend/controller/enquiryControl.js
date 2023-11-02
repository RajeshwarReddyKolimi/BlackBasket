const Enquiry = require("../models/enqModel");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const validateMongodbId = require("../utils/validateMongodbId");

const createEnquiry = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { query } = req.body;
    console.log("Waiting");
    try {
        const user = await User.findByIdAndUpdate(
            _id,
            {
                $push: {
                    queries: {
                        subject: query.subject,
                        description: query.description,
                        status: "Submitted",
                    },
                },
            },
            { new: true }
        );
        if (!user) throw new Error("Cannot raise query");
        const newEnquiry = await Enquiry.create(query);
        res.json(user.queries);
    } catch (error) {
        throw new Error(error);
    }
});

const updateEnquiry = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const updateCategory = await Enquiry.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        res.json(updateCategory);
    } catch (error) {
        throw new Error(error);
    }
});

const deleteEnquiry = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const deleteCategory = await Enquiry.findByIdAndDelete(id);
        res.json(deleteCategory);
    } catch (error) {
        throw new Error(error);
    }
});

const getEnquiry = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const getCategory = await Enquiry.findById(id);
        res.json(getCategory);
    } catch (error) {
        throw new Error(error);
    }
});

const getAllEnquiry = asyncHandler(async (req, res) => {
    try {
        const getAllCategory = await Enquiry.find();
        res.json(getAllCategory);
    } catch (error) {
        throw new Error(error);
    }
});

module.exports = {
    createEnquiry,
    updateEnquiry,
    deleteEnquiry,
    getEnquiry,
    getAllEnquiry,
};
