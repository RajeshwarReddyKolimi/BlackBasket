const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_KEY, { expiresIn: "1d" });
};

module.exports = { generateToken };
