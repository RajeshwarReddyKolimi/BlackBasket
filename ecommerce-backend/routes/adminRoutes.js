const express = require("express");
const { userAuth, adminAuth } = require("../middleware/authMiddleware");
const {
    loginAdmin,
    blockUser,
    unblockUser,
    updateOrderStatus,
    getAllUsers,
    getOneUser,
    deleteUser,
    updateAdmin,
    logoutAdmin,
    forgotPasswordToken,
    resetPassword,
    updatePassword,
    handleRefreshToken,
    getAdminDetails,
    createAdmin,
} = require("../controller/adminControl");
const router = express.Router();
router.post("/register", createAdmin); //
router.post("/login", loginAdmin); //
router.post("/forgot-password-token", forgotPasswordToken);

router.put("/reset-password/:token", resetPassword);
router.put("/password", adminAuth, updatePassword);
router.put("/update", adminAuth, updateAdmin); //
router.put("/blockUser/:id", adminAuth, blockUser); //
router.put("/unblockUser/:id", adminAuth, unblockUser); //
router.put("/order/update/:id", adminAuth, updateOrderStatus);

router.get("/refresh", handleRefreshToken);
router.get("/logout", logoutAdmin); //
router.get("/users/all", adminAuth, getAllUsers); //
router.get("/user/:id", adminAuth, getOneUser); //
router.get("/details", getAdminDetails); //

router.delete("/deleteUser/:id", adminAuth, deleteUser); //

module.exports = router;
