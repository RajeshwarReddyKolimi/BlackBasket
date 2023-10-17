const express = require("express");
const dbConnect = require("./config/dbConnect");
const app = express();
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 3000;
const authRouter = require("./routes/authRoutes");
const adminRouter = require("./routes/adminRoutes");
const productRouter = require("./routes/productRoutes");
const blogRouter = require("./routes/blogRoutes");
const productCategoryRouter = require("./routes/productCategoryRoutes");
const blogCategoryRouter = require("./routes/blogCategoryRoutes");
const brandRouter = require("./routes/brandRoutes");
const colorRouter = require("./routes/colorRoutes");
const couponRouter = require("./routes/couponRoutes");
const enquiryRouter = require("./routes/enquiryRoutes");
const bodyParser = require("body-parser");
const { default: mongoose } = require("mongoose");
const { notFound, errorHandler } = require("./middleware/errorHandler");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const cors = require("cors");
dbConnect();
app.use(morgan("dev"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true,
    })
);
app.use(cookieParser());

app.use("/api/user", authRouter);
app.use("/api/admin", adminRouter);
app.use("/api/product", productRouter);
app.use("/api/blog", blogRouter);
app.use("/api/productCategory", productCategoryRouter);
app.use("/api/blogCategory", blogCategoryRouter);
app.use("/api/brand", brandRouter);
app.use("/api/color", colorRouter);
app.use("/api/enquiry", enquiryRouter);
app.use("/api/coupon", couponRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server running at ${PORT}`);
});
