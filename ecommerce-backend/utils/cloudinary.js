const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const app = express();
const port = 3001;
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
});

const cloudinaryStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    folder: "images",
});

const upload = multer({
    storage: cloudinaryStorage,
});
const uploadFiles = upload.array("images", 5);

const uploadImages = (req, res) => {
    return new Promise((resolve, reject) => {
        uploadFiles(req, res, (err) => {
            if (err) {
                reject(err);
            }
            const uploadedFiles = req.files;
            if (!uploadedFiles || uploadedFiles.length === 0) {
                resolve([]);
            }
            const fileUrls = uploadedFiles.map((file) => file.path);
            resolve(fileUrls);
        });
    });
};
module.exports = { uploadImages };
