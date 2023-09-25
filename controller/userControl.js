const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const { generateKey } = require("../config/jwtToken");
const createUser = asyncHandler(async (req, res) => {
    const email = req.body.email;
    const findUser = await User.findOne({ email: email });
    if (!findUser) {
        const newUser = await User.create(req.body);
        res.json(newUser);
    } else {
        throw new Error("User already exists");
    }
});

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const findUser = await User.findOne({ email });
    if (findUser) {
        if (await findUser.isPasswordMatched(password)) {
            res.json({
                _id: findUser?._id,
                firstName: findUser?.firstName,
                lastName: findUser?.lastName,
                email: findUser?.email,
                token: generateKey(findUser?._id),
            });
        } else throw new Error("Invalid password");
    } else throw new Error("User not found");
});

module.exports = { createUser, loginUser };
