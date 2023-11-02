const express = require("express");
const { adminAuth, userAuth } = require("../middleware/authMiddleware");
const {
    createEnquiry,
    updateEnquiry,
    deleteEnquiry,
    getEnquiry,
    getAllEnquiry,
} = require("../controller/enquiryControl");
const router = express.Router();
router.post("/", userAuth, createEnquiry);
router.put("/:id", adminAuth, updateEnquiry);
router.delete("/:id", adminAuth, deleteEnquiry);
router.get("/:id", getEnquiry);
router.get("/", getAllEnquiry);
module.exports = router;
