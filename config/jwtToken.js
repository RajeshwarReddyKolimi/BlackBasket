const jwt = require("jsonwebtoken");
const generateKey = (id) => {
    return jwt.sign({ id }, "abcdef", { expiresIn: "3d" });
};

module.exports = { generateKey };
