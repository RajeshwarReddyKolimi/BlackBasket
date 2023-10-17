const express = require("express");
const { userAuth, adminAuth } = require("../middleware/authMiddleware");
const {
    createColor,
    updateColor,
    deleteColor,
    getColor,
    getAllColor,
} = require("../controller/colorControl");
const router = express.Router();
router.post("/", adminAuth, createColor);
router.put("/:id", adminAuth, updateColor);
router.delete("/:id", adminAuth, deleteColor);
router.get("/:id", getColor);
router.get("/", getAllColor);
module.exports = router;
