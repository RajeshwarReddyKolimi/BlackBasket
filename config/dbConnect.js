const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const dbConnect = async () => {
    try {
        const conn = await mongoose.connect(
            "mongodb://127.0.0.1:27017/BlackBasket",
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }
        );
        console.log("Connected to database");
    } catch (error) {
        console.error(error);
    }
};
module.exports = dbConnect;
