const express = require("express");
const { userAuth, adminAuth } = require("../middleware/authMiddleware");
const {
    createBlog,
    updateBlog,
    getBlog,
    getAllBlogs,
    deleteBlog,
    likeBlog,
    dislikeBlog,
    uploadImages,
} = require("../controller/blogControl");
const router = express.Router();
router.post("/", userAuth, adminAuth, createBlog);
router.put("/likes", userAuth, likeBlog);
router.put("/dislikes", userAuth, dislikeBlog);
router.put("/:id", userAuth, adminAuth, updateBlog);
router.get("/:id", getBlog);
router.get("/", getAllBlogs);
router.delete("/:id", userAuth, adminAuth, deleteBlog);
module.exports = router;
