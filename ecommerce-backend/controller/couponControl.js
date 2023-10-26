const Coupon = require("../models/couponModel");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const { validateMongodbId } = require("../utils/validateMongodbId");

const createCoupon = asyncHandler(async (req, res) => {
    try {
        const newCoupon = await Coupon.create(req.body);
        const update = await User.updateMany(
            {},
            { $push: { coupons: newCoupon._id } }
        );
        res.json(newCoupon);
    } catch (error) {
        throw new Error(error);
    }
});

const getAllCoupons = asyncHandler(async (req, res) => {
    try {
        const getCoupons = await Coupon.find();
        res.json(getCoupons);
    } catch (error) {
        throw new Error(error);
    }
});

const updateCoupon = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongodbId(id);
    try {
        const updCoupon = await Coupon.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        res.json(updCoupon);
    } catch (error) {
        throw new Error(error);
    }
});

const deleteCoupon = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongodbId(id);
    try {
        const delCoupon = await Coupon.findByIdAndDelete(id);
        const update = await User.updateMany(
            {},
            { $pull: { coupons: delCoupon._id } }
        );
        res.json(delCoupon);
    } catch (error) {
        throw new Error(error);
    }
});

module.exports = { createCoupon, getAllCoupons, updateCoupon, deleteCoupon };
