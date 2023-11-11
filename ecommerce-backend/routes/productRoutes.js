const express = require("express");
const {
    createProduct,
    getAProduct,
    getAllProducts,
    updateProduct,
    deleteProduct,
    addToWishlist,
    updateRating,
    addToCart,
    uploadProductImage,
    searchProducts,
    getRating,
} = require("../controller/productControl");
const { adminAuth, userAuth } = require("../middleware/authMiddleware");
const { uploadImages, handleUpload } = require("../utils/cloudinary");
const router = express.Router();

router.post("/", adminAuth, handleUpload, createProduct); //

router.put("/upload/:id", adminAuth, uploadProductImage);
router.put("/wishlist", userAuth, addToWishlist); //
router.put("/cart", userAuth, addToCart); //
router.put("/rating", userAuth, updateRating); //
router.put("/:id", adminAuth, handleUpload, updateProduct); //

router.get("/rating/:id", userAuth, getRating); //
router.get("/search", searchProducts); //
router.get("/:id", getAProduct); //
router.get("/", getAllProducts); //

router.delete("/:id", adminAuth, deleteProduct); //

module.exports = router;
