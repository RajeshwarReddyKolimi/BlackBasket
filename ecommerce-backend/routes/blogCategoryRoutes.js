const express = require("express");
const { userAuth, adminAuth } = require("../middleware/authMiddleware");
const {
    createBlogCategory,
    updateBlogCategory,
    deleteBlogCategory,
    getBlogCategory,
    getAllBlogCategory,
} = require("../controller/blogCategoryControl");
const router = express.Router();
router.post("/", adminAuth, createBlogCategory);
router.put("/:id", adminAuth, updateBlogCategory);
router.delete("/:id", adminAuth, deleteBlogCategory);
router.get("/:id", getBlogCategory);
router.get("/", getAllBlogCategory);
module.exports = router;
