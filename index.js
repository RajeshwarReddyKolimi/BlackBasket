const express = require("express");
const dbConnect = require("./config/dbConnect");
const app = express();
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 3000;
const authRouter = require("./routes/authRoutes");
const bodyParser = require("body-parser");
const { default: mongoose } = require("mongoose");
const { notFound, errorHandler } = require("./middleware/errorHandler");
const cookieParser = require("cookie-parser");
const productRouter = require("./routes/productRoutes");
const morgan = require("morgan");
dbConnect();
app.use(morgan("dev"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());

app.use("/api/user", authRouter);
app.use("/api/product", productRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server running at ${PORT}`);
});
// mongodb://localhost:27017/
