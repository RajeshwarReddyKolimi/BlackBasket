const User = require("../models/userModel");
const Admin = require("../models/adminModel");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();
const asyncHandler = require("express-async-handler");

const userAuth = asyncHandler(async (req, res, next) => {
    console.log(req.cookies);
    if (req?.cookies?.refreshToken) {
        const token = req.cookies.refreshToken;
        try {
            const decoded = jwt.verify(token, process.env.JWT_KEY);
            const user = await User.findById(decoded?.id);
            req.user = user;
            next();
        } catch (error) {
            throw new Error(" not Authorized, Please Log in");
        }
    } else {
        throw new Error(" There is no token attached to header");
    }
});

const adminAuth = asyncHandler(async (req, res, next) => {
    if (req?.cookies?.refreshToken) {
        const token = req.cookies.refreshToken;
        try {
            if (token) {
                const decoded = jwt.verify(token, process.env.JWT_KEY);
                const admin = await Admin.findById(decoded?.id);
                if (admin.role !== "Admin") {
                    throw new Error("You are not an Admin");
                } else {
                    req.admin = admin;
                    next();
                }
            }
        } catch (error) {
            throw new Error(" not Authorized, Please Log in");
        }
    } else {
        throw new Error(" There is no token attached to header");
    }
});

module.exports = { userAuth, adminAuth };
