const express = require("express");
const { adminAuth } = require("../middleware/authMiddleware");
const {
    createSlider,
    updateSlider,
    getSliders,
    deleteSlider,
} = require("../controller/sliderControl");
const { handleUpload } = require("../utils/cloudinary");
const router = express.Router();
router.post("/", handleUpload, adminAuth, createSlider);
router.put("/:id", handleUpload, adminAuth, updateSlider);
router.get("/", getSliders);
router.delete("/:id", adminAuth, deleteSlider);
module.exports = router;
