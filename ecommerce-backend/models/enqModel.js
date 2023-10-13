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
    comment: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: "Submitted",
        enum: ["Submitted", "Resolved", "Contacted", "In Progress"],
    },
});

module.exports = mongoose.model("Enquiry", enquirySchema);
