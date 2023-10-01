const mongoose = require("mongoose");

var blogSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        numViews: {
            type: Number,
            default: 0,
        },
        isLiked: {
            type: Boolean,
            default: false,
        },
        isDisliked: {
            type: Boolean,
            default: false,
        },
        likes: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        dislikes: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        image: {
            type: String,
            default:
                "data:image/jpeg;base64,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",
        },
        author: {
            type: String,
            default: "Admin",
        },
    },
    {
        toJSON: {
            virtuals: true,
        },
        toObject: {
            virtuals: true,
        },
        timestamps: true,
    }
);

module.exports = mongoose.model("Blog", blogSchema);
