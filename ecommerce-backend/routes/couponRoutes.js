const express = require("express");
const { adminAuth, userAuth } = require("../middleware/authMiddleware");
const {
    createCoupon,
    getAllCoupons,
    updateCoupon,
    deleteCoupon,
    getCouponById,
} = require("../controller/couponControl");
const { applyCoupon } = require("../controller/userControl");
const router = express.Router();

router.post("/", adminAuth, createCoupon);
router.get("/", userAuth, getAllCoupons);
router.get("/:id", adminAuth, getCouponById);
router.put("/:id", adminAuth, updateCoupon);
router.delete("/:id", adminAuth, deleteCoupon);
module.exports = router;
