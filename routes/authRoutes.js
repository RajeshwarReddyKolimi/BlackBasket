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
} = require("../controller/userControl");
const { authMiddleware, isAdmin } = require("../middleware/authMiddleware");
const router = express.Router();
router.post("/register", createUser);
router.post("/login", loginUser);
router.get("/getAllUsers", getAllUsers);
router.get("/getUser/:id", authMiddleware, isAdmin, getOneUser);
router.delete("/deleteUser/:id", deleteUser);
router.put("/updateUser", authMiddleware, updateUser);
router.put("/blockUser/:id", authMiddleware, isAdmin, blockUser);
router.put("/unblockUser/:id", authMiddleware, isAdmin, unblockUser);
router.get("/refresh", handleRefreshToken);
router.get("/logout", logoutUser);

module.exports = router;