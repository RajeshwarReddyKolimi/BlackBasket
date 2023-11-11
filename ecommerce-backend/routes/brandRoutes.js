const express = require("express");
const { userAuth, adminAuth } = require("../middleware/authMiddleware");
const {
    createBrand,
    updateBrand,
    deleteBrand,
    getBrand,
    getAllBrand,
} = require("../controller/brandControl");
const { handleUpload } = require("../utils/cloudinary");
const router = express.Router();
router.post("/", adminAuth, handleUpload, createBrand);
router.put("/:id", adminAuth, handleUpload, updateBrand);
router.delete("/:id", adminAuth, deleteBrand);
router.get("/:id", getBrand);
router.get("/", getAllBrand);
module.exports = router;
