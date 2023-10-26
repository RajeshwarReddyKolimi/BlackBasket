const express = require("express");
const {
    createUser,
    loginUser,
    updateUser,
    handleRefreshToken,
    logoutUser,
    updatePassword,
    forgotPasswordToken,
    resetPassword,
    getWishlist,
    saveAddress,
    getUserCart,
    emptyCart,
    applyCoupon,
    createOrder,
    getOrders,
    getUserDetails,
    removeFromCart,
    addAddress,
    updateAddress,
} = require("../controller/userControl");
const { userAuth, adminAuth } = require("../middleware/authMiddleware");
const {
    loginAdmin,
    blockUser,
    unblockUser,
    updateOrderStatus,
    getAllUsers,
    getOneUser,
    deleteUser,
} = require("../controller/adminControl");
const router = express.Router();
router.post("/register", createUser); //
router.post("/login", loginUser); //
router.post("/forgot-password-token", forgotPasswordToken);
router.post("/createOrder", userAuth, createOrder);
router.post("/address", userAuth, addAddress);

router.put("/address/:id", userAuth, updateAddress);
router.put("/reset-password/:token", resetPassword);
router.put("/password", userAuth, updatePassword);
router.put("/update", userAuth, updateUser); //
router.put("/cart/remove", userAuth, removeFromCart);
router.put("/applyCoupon/:id", userAuth, applyCoupon);

router.get("/refresh", handleRefreshToken);
router.get("/logout", logoutUser); //
router.get("/details", getUserDetails); //
router.get("/wishlist", userAuth, getWishlist); //
router.get("/cart", userAuth, getUserCart); //
router.get("/orders", userAuth, getOrders); // Pending

router.delete("/emptyCart", userAuth, emptyCart);

module.exports = router;
