const express = require("express");
const { adminAuth } = require("../middleware/authMiddleware");
const {
    createProductCategory,
    updateProductCategory,
    deleteProductCategory,
    getProductCategory,
    getAllProductCategory,
} = require("../controller/productCategoryControl");
const router = express.Router();
router.post("/", adminAuth, createProductCategory);
router.put("/:id", adminAuth, updateProductCategory);
router.delete("/:id", adminAuth, deleteProductCategory);
router.get("/:id", getProductCategory);
router.get("/", getAllProductCategory);
module.exports = router;
