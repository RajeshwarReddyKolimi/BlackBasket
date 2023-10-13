const express = require("express");
const { authMiddleware, isAdmin } = require("../middleware/authMiddleware");
const {
    createProductCategory,
    updateProductCategory,
    deleteProductCategory,
    getProductCategory,
    getAllProductCategory,
} = require("../controller/productCategoryControl");
const router = express.Router();
router.post("/", authMiddleware, isAdmin, createProductCategory);
router.put("/:id", authMiddleware, isAdmin, updateProductCategory);
router.delete("/:id", authMiddleware, isAdmin, deleteProductCategory);
router.get("/:id", getProductCategory);
router.get("/", getAllProductCategory);
module.exports = router;
