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
    deleteImages,
    addToCart,
} = require("../controller/productControl");
const { adminAuth, userAuth } = require("../middleware/authMiddleware");
const { uploadPhoto, productImgResize } = require("../middleware/uploadImages");
const router = express.Router();

router.post("/", adminAuth, createProduct); //

router.put(
    "/upload",
    userAuth,
    adminAuth,
    uploadPhoto.array("images", 10),
    productImgResize,
    uploadImages
);
router.put("/wishlist", userAuth, addToWishlist); //
router.put("/cart", userAuth, addToCart); //
router.put("/rating", userAuth, updateRating); //
router.put("/:id", adminAuth, updateProduct); //

router.get("/:id", getAProduct); //
router.get("/", getAllProducts); //

router.delete("/:id", adminAuth, deleteProduct); //
router.delete("/deleteImage/:id", adminAuth, deleteImages);

module.exports = router;
