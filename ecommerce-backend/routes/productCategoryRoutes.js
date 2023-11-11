const express = require("express");
const { adminAuth } = require("../middleware/authMiddleware");
const {
    createProductCategory,
    updateProductCategory,
    deleteProductCategory,
    getProductCategory,
    getAllProductCategory,
} = require("../controller/productCategoryControl");
const { handleUpload } = require("../utils/cloudinary");
const router = express.Router();
router.post("/", adminAuth, handleUpload, createProductCategory);
router.put("/:id", adminAuth, handleUpload, updateProductCategory);
router.delete("/:id", adminAuth, deleteProductCategory);
router.get("/:id", getProductCategory);
router.get("/", getAllProductCategory);
module.exports = router;
