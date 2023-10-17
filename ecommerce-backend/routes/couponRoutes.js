const express = require("express");
const { adminAuth } = require("../middleware/authMiddleware");
const {
    createCoupon,
    getAllCoupons,
    updateCoupon,
    deleteCoupon,
} = require("../controller/couponControl");
const router = express.Router();

router.post("/", adminAuth, createCoupon);
router.get("/", adminAuth, getAllCoupons);
router.put("/:id", adminAuth, updateCoupon);
router.delete("/:id", adminAuth, deleteCoupon);
module.exports = router;
