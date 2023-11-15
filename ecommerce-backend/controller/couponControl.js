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
        const time = Date.now();
        const allCoupons = await Coupon.find();
        allCoupons.sort((a, b) => b.expiry - a.expiry);
        res.json(allCoupons);
    } catch (error) {
        // console.log(error);
        throw new Error(error);
    }
});

const getAllCoupons = asyncHandler(async (req, res) => {
    try {
        const time = Date.now();
        const allCoupons = await Coupon.find();
        allCoupons.sort((a, b) => b.expiry - a.expiry);
        res.json(allCoupons);
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
            {
                coupons: { coupon: id },
            },
            {
                $set: {
                    coupons: {
                        coupon: updCoupon._id,
                        code: coupon.name.toUpperCase(),
                    },
                },
            }
        );
        const time = Date.now();
        const allCoupons = await Coupon.find();
        allCoupons.sort((a, b) => b.expiry - a.expiry);
        res.json(allCoupons);
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
        const time = Date.now();
        const allCoupons = await Coupon.find();
        allCoupons.sort((a, b) => b.expiry - a.expiry);
        res.json(allCoupons);
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
