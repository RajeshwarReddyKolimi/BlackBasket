// const { CommandStartedEvent } = require("mongodb");
const Product = require("../models/productModel.js");
const Color = require("../models/colorModel.js");
const Brand = require("../models/brandModel.js");
const ProductCategory = require("../models/productCategoryModel.js");
const User = require("../models/userModel.js");
const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const { validateMongodbId } = require("../utils/validateMongodbId");
const {
    cloudinaryUploadImg,
    cloudinaryDeleteImg,
    uploadImages,
} = require("../utils/cloudinary.js");
const fs = require("fs");
const createProduct = asyncHandler(async (req, res) => {
    try {
        const formData = req.body;
        const slug = req.body.title ? slugify(req.body.title) : "";
        req.body.slug = slug;
        req.body.brand = req.body.brand ? req.body.brand.toUpperCase() : "";
        req.body.color = req.body.color ? req.body.color.toUpperCase() : "";
        req.body.category = req.body.category
            ? req.body.category.toUpperCase()
            : "";
        const newProduct = await Product.create(req.body);
        const brand = await Brand.find({ name: req.body.brand });
        if (!brand)
            updateBrand = await Brand.create({
                name: req.body.brand,
            });
        const color = await Color.find({ name: req.body.color });
        if (!color)
            updatecolor = await Color.create({
                name: req.body.color,
            });
        const category = await ProductCategory.find({
            name: req.body.category,
        });
        if (!category)
            updatecolor = await ProductCategory.create({
                name: req.body.category,
            });
        res.json(newProduct);
    } catch (error) {
        console.error(error);
        throw new Error(error);
    }
});

const updateProduct = asyncHandler(async (req, res) => {
    const productId = req.params.id;
    try {
        const formData = req.body;
        const slug = req.body.title ? slugify(req.body.title) : "";
        req.body.slug = slug;
        const updateProduct = await Product.findByIdAndUpdate(
            productId,
            req.body,
            { new: true }
        );
        res.json(updateProduct);
    } catch (error) {
        console.error(error);
        throw new Error(error);
    }
});

const deleteProduct = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id);
        const deleteProd = await Product.findByIdAndDelete(id);
        res.json(deleteProd);
    } catch (error) {
        throw new Error(error);
    }
});

const getAProduct = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const getProduct = await Product.findById(id);
        res.json(getProduct);
    } catch (error) {
        throw new Error(error);
    }
});

const searchProducts = asyncHandler(async (req, res) => {
    try {
        const perPage = 20;
        const {
            id: searchTerm,
            page,
            sort,
            brands,
            maxPrice,
            minPrice,
            star,
            discount,
            colors,
            categories,
            category,
        } = req.query;
        console.log(req.query);
        const query = {
            $or: [
                { title: { $regex: new RegExp(searchTerm, "i") } },
                { brand: { $regex: new RegExp(searchTerm, "i") } },
                { category: { $regex: new RegExp(searchTerm, "i") } },
                { color: { $regex: new RegExp(searchTerm, "i") } },
            ],
        };
        const filters = [];
        if (brands) {
            const selectedBrands = brands.split(",");
            filters.push({
                brand: {
                    $in: selectedBrands.map((brand) => new RegExp(brand, "i")),
                },
            });
        }

        if (colors) {
            const selectedColors = colors.split(",");
            filters.push({
                color: {
                    $in: selectedColors.map((color) => new RegExp(color, "i")),
                },
            });
        }

        if (categories) {
            const selectedCategories = categories.split(",");
            filters.push({
                category: {
                    $in: selectedCategories.map(
                        (category) => new RegExp(category, "i")
                    ),
                },
            });
        }

        if (category) {
            filters.push({
                category: {
                    category,
                },
            });
        }
        if (filters.length > 0) {
            query.$and = filters;
        }
        if (maxPrice) {
            query.price = { $lte: parseFloat(maxPrice) };
        }

        if (minPrice) {
            query.price = { ...query.price, $gte: parseFloat(minPrice) };
        }
        if (star) {
            query.totalrating = { $gte: parseFloat(star) };
        }

        if (discount) {
            query.discount = { $gte: parseFloat(discount) };
        }

        const sortOptions = {
            priceAsc: { price: 1 },
            priceDesc: { price: -1 },
            timeAsc: { createdAt: -1 },
            ratingAsc: { totalrating: 1 },
            ratingDesc: { totalrating: -1 },
            discount: { discount: -1 },
            mostSold: { sold: -1 },
        };

        let sortQuery = "";
        if (sort && sortOptions[sort]) {
            sortQuery = sortOptions[sort];
        }
        const getProduct = await Product.find(query)
            .sort(sortQuery)
            .skip((page - 1) * perPage)
            .limit(perPage)
            .exec();
        res.json(getProduct);
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
});

const getAllProducts = asyncHandler(async (req, res) => {
    try {
        // Filtering

        const queryObj = { ...req.query };
        const excludeFields = ["page", "sort", "limit", "fields"];
        excludeFields.forEach((ef) => delete queryObj[ef]);
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(
            /\b(gte|gt|lte|lt)\b/g,
            (match) => `$${match}`
        );
        let query = Product.find(JSON.parse(queryStr));

        // Sorting

        if (req.query.sort) {
            const sortBy = req.query.sort.split(",").join(" ");
            query = query.sort(sortBy);
        } else {
            query = query.sort("-createdAt");
        }

        // Limiting the fields

        if (req.query.fields) {
            const fields = req.query.fields.split(",").join(" ");
            query = query.select(fields);
        } else {
            query = query.select("-__v");
        }

        // Pagination

        const page = req.query.page;
        const limit = req.query.limit;
        const skip = (page - 1) * limit;
        query = query.skip(skip).limit(limit);
        if (req.query.page) {
            const productCount = await Product.countDocuments();
            if (skip >= productCount) throw new Error("No more products");
        }
        const product = await query;
        res.json(product);
    } catch (error) {
        throw new Error(error);
    }
});

const addToWishlist = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { productId } = req.body;
    try {
        const user = await User.findById(_id);
        const alreadyAdded = user.wishlist.find(
            (_id) => _id.toString() === productId.toString()
        );
        if (alreadyAdded) {
            let user = await User.findByIdAndUpdate(
                _id,
                {
                    $pull: { wishlist: productId },
                },
                { new: true }
            );
            await user.save();
            res.json(user.wishlist);
        } else {
            let user = await User.findByIdAndUpdate(
                _id,
                {
                    $push: { wishlist: productId },
                },
                { new: true }
            );
            await user.save();
            res.json(user.wishlist);
        }
    } catch (error) {
        throw new Error(error);
    }
});

const addToCart = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { productId } = req.body;
    try {
        let user = await User.findById(_id);
        const existingCartItem = user.cart.items.find(
            (cartItem) => cartItem.product.toString() === productId.toString()
        );
        if (existingCartItem) {
            existingCartItem.quantity += 1;
        } else {
            user.cart.items.push({ product: productId, quantity: 1 });
        }
        await user.save();
        let total = user.cart.totalPrice;
        const product = await Product.findById(productId);
        total += product.price;
        user.cart.totalPrice = total;
        await user.save();
        await user.populate("cart.items.product");
        res.json(user.cart);
    } catch (error) {
        throw new Error(error);
    }
});

const updateRating = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { star, productId, comment } = req.body;
    try {
        const user = await User.findById(_id);
        const product = await Product.findById(productId);
        let alreadyRated = product.ratings.find(
            (userId) => userId?.postedby?.userId?.toString() === _id.toString()
        );

        if (alreadyRated) {
            const updateRate = await Product.updateOne(
                {
                    ratings: { $elemMatch: alreadyRated },
                },
                {
                    $set: {
                        "ratings.$.star": star,
                        "ratings.$.comment": comment,
                        "ratings.$.date": Date.now(),
                    },
                },
                {
                    new: true,
                }
            );

            const updatedUser = await User.findOneAndUpdate(
                {
                    _id,
                    "ratings.productId": productId,
                },
                {
                    $set: {
                        "ratings.$.star": star,
                        "ratings.$.comment": comment,
                        "ratings.$.date": Date.now(),
                    },
                },
                { new: true }
            );
        } else {
            const rateProduct = await Product.findByIdAndUpdate(
                productId,
                {
                    $push: {
                        ratings: {
                            star: star,
                            comment: comment,
                            postedby: {
                                userId: _id,
                                userName: user.firstName + " " + user.lastName,
                            },
                            date: Date.now(),
                        },
                    },
                },
                { new: true }
            );
            const updatedUser = await User.findByIdAndUpdate(
                _id,
                {
                    $push: {
                        ratings: {
                            star: star,
                            comment: comment,
                            productId,
                            date: Date.now(),
                        },
                    },
                },
                { new: true }
            );
        }
        const getOverallRating = await Product.findById(productId);
        let totalRating = getOverallRating.ratings.length;
        let ratingSum = getOverallRating.ratings
            .map((item) => item.star)
            .reduce((prev, cur) => prev + cur, 0);
        let actualRating = Math.round(ratingSum / totalRating);
        let finalProduct = await Product.findByIdAndUpdate(
            productId,
            {
                totalrating: actualRating,
            },
            { new: true }
        );
        res.json(finalProduct);
    } catch (error) {
        throw new Error(error);
    }
});

const getRating = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { id: productId } = req.params;
    try {
        const product = await Product.findById(productId);
        let rating = {};
        rating = product.ratings.find(
            (userId) => userId?.postedby?.userId?.toString() === _id.toString()
        );
        console.log(rating);
        res.json(rating);
    } catch (error) {
        throw new Error(error);
    }
});

const uploadProductImage = asyncHandler(async (req, res) => {
    const productId = req.params.id;
    try {
        const imgUrls = await uploadImages(req, res);
        const product = await Product.findByIdAndUpdate(
            productId,
            {
                $set: { images: imgUrls },
            },
            { new: true }
        );

        res.json(product.images);
    } catch (error) {
        throw new Error(error);
    }
});

module.exports = {
    createProduct,
    getAProduct,
    getAllProducts,
    updateProduct,
    deleteProduct,
    addToWishlist,
    addToCart,
    updateRating,
    getRating,
    uploadProductImage,
    searchProducts,
};
