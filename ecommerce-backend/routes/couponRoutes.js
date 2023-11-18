const express = require("express");
const { adminAuth, userAuth } = require("../middleware/authMiddleware");
const {
    createCoupon,
    getAllCoupons,
    updateCoupon,
    deleteCoupon,
    getCouponById,
} = require("../controller/couponControl");
const router = express.Router();

router.post("/", adminAuth, createCoupon);
router.get("/:id", adminAuth, getCouponById);
router.get("/", adminAuth, getAllCoupons);
router.put("/:id", adminAuth, updateCoupon);
router.delete("/:id", adminAuth, deleteCoupon);
module.exports = router;
