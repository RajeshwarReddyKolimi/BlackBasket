const express = require("express");
const { userAuth, adminAuth } = require("../middleware/authMiddleware");
const {
    createBrand,
    updateBrand,
    deleteBrand,
    getBrand,
    getAllBrand,
} = require("../controller/brandControl");
const router = express.Router();
router.post("/", adminAuth, createBrand);
router.put("/:id", adminAuth, updateBrand);
router.delete("/:id", adminAuth, deleteBrand);
router.get("/:id", getBrand);
router.get("/", getAllBrand);
module.exports = router;
