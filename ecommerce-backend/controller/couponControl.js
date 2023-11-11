const Coupon = require("../models/couponModel");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const { validateMongodbId } = require("../utils/validateMongodbId");

const createCoupon = asyncHandler(async (req, res) => {
    const { coupon } = req.body;
    try {
        const newCoupon = await Coupon.create(coupon);
        const update = await User.updateMany(
            {},
            {
                $push: {
                    coupons: {
                        coupon: newCoupon._id,
                        code: coupon.name.toUpperCase(),
                    },
                },
            }
        );
        res.json(newCoupon);
    } catch (error) {
        // console.log(error);
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

const getCouponById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongodbId(id);
    try {
        const coupon = await Coupon.findById(id);
        if (!coupon) throw new Error("Coupon Not found");
        res.json(coupon);
    } catch (error) {
        throw new Error(error);
    }
});

const updateCoupon = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { coupon } = req.body;
    validateMongodbId(id);
    try {
        const updCoupon = await Coupon.findByIdAndUpdate(id, coupon, {
            new: true,
        });
        const update = await User.updateMany(
            {},
            { $set: { coupons: { code: coupon.name.toUpperCase() } } }
        );
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

module.exports = {
    createCoupon,
    getAllCoupons,
    getCouponById,
    updateCoupon,
    deleteCoupon,
};
