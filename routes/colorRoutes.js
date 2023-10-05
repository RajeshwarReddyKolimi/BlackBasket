const express = require("express");
const { authMiddleware, isAdmin } = require("../middleware/authMiddleware");
const {
    createColor,
    updateColor,
    deleteColor,
    getColor,
    getAllColor,
} = require("../controller/colorControl");
const router = express.Router();
router.post("/", authMiddleware, isAdmin, createColor);
router.put("/:id", authMiddleware, isAdmin, updateColor);
router.delete("/:id", authMiddleware, isAdmin, deleteColor);
router.get("/:id", getColor);
router.get("/", getAllColor);
module.exports = router;
