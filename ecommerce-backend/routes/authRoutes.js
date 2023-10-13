const express = require("express");
const {
    createUser,
    loginUser,
    getAllUsers,
    deleteUser,
    getOneUser,
    updateUser,
    blockUser,
    unblockUser,
    handleRefreshToken,
    logoutUser,
    updatePassword,
    forgotPasswordToken,
    resetPassword,
    loginAdmin,
    getWishlist,
    saveAddress,
    getUserCart,
    emptyCart,
    applyCoupon,
    createOrder,
    getOrders,
    updateOrderStatus,
    getUserDetails,
    removeFromCart,
} = require("../controller/userControl");
const { authMiddleware, isAdmin } = require("../middleware/authMiddleware");
const router = express.Router();
router.post("/register", createUser);
router.post("/login", loginUser);
router.post("/admin-login", loginAdmin);
router.post("/forgot-password-token", forgotPasswordToken);
router.post("/cart/cashOrder", authMiddleware, createOrder);

router.put("/reset-password/:token", resetPassword);
router.put("/password", authMiddleware, updatePassword);
router.put("/saveAddress", authMiddleware, saveAddress);
router.put("/updateUser", authMiddleware, updateUser);
router.put("/blockUser/:id", authMiddleware, isAdmin, blockUser);
router.put("/unblockUser/:id", authMiddleware, isAdmin, unblockUser);
router.put("/order/update/:id", authMiddleware, isAdmin, updateOrderStatus);
router.put("/cart/removeFromCart", authMiddleware, removeFromCart);

router.get("/refresh", handleRefreshToken);
router.get("/logout", logoutUser);
router.get("/getAllUsers", getAllUsers);
router.get("/getUser/:id", authMiddleware, isAdmin, getOneUser);
router.get("/getUserDetails", getUserDetails);
router.get("/wishlist", authMiddleware, getWishlist);
router.get("/cart", authMiddleware, getUserCart);
router.get("/orders", authMiddleware, getOrders);

router.delete("/deleteUser/:id", deleteUser);
router.delete("/emptyCart", authMiddleware, emptyCart);

module.exports = router;
