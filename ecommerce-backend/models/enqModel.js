const mongoose = require("mongoose");

var enquirySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    mobile: {
        type: String,
        required: true,
    },
    subject: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    status: {
        type: String,
        default: "Submitted",
        enum: ["Submitted", "Resolved", "In Progress"],
    },
});

module.exports = mongoose.model("Enquiry", enquirySchema);
