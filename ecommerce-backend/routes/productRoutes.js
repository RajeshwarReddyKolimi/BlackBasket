const express = require("express");
const {
    createProduct,
    getAProduct,
    getAllProducts,
    updateProduct,
    deleteProduct,
    addToWishlist,
    updateRating,
    deleteImages,
    addToCart,
    uploadProductImage,
} = require("../controller/productControl");
const { adminAuth, userAuth } = require("../middleware/authMiddleware");
const { uploadImages } = require("../utils/cloudinary");
const router = express.Router();

router.post("/", adminAuth, createProduct); //

router.put("/upload/:id", adminAuth, uploadProductImage);
router.put("/wishlist", userAuth, addToWishlist); //
router.put("/cart", userAuth, addToCart); //
router.put("/rating", userAuth, updateRating); //
router.put("/:id", adminAuth, updateProduct); //

router.get("/:id", getAProduct); //
router.get("/", getAllProducts); //

router.delete("/:id", adminAuth, deleteProduct); //

module.exports = router;
