const express = require("express");
const {
    createProduct,
    getAProduct,
    getAllProducts,
    updateProduct,
    deleteProduct,
    addToWishlist,
    updateRating,
    uploadImages,
} = require("../controller/productControl");
const { isAdmin, authMiddleware } = require("../middleware/authMiddleware");
const { uploadPhoto, productImgResize } = require("../middleware/uploadImages");
const router = express.Router();

router.post("/", authMiddleware, isAdmin, createProduct);
router.put(
    "/upload/:id",
    authMiddleware,
    isAdmin,
    uploadPhoto.array("images", 10),
    productImgResize,
    uploadImages
);
router.put("/wishlist", authMiddleware, addToWishlist);
router.put("/rating", authMiddleware, updateRating);
router.put("/:id", authMiddleware, isAdmin, updateProduct);
router.get("/:id", getAProduct);
router.get("/", getAllProducts);
router.delete("/:id", authMiddleware, isAdmin, deleteProduct);

module.exports = router;
