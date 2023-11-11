import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, Navigate, useParams } from "react-router-dom";
import { deleteProduct, getProducts } from "../../Redux/Thunks/productThunks";
import { AiFillStar } from "react-icons/ai";
import { IoIosShareAlt } from "react-icons/io";
import {
    addToCart,
    getUserDetails,
    toWishlist,
} from "../../Redux/Thunks/userThunks";
import { MdDelete, MdEmail, MdVerified } from "react-icons/md";
import Empty from "../Empty";
import {
    TwitterShareButton,
    TelegramShareButton,
    LinkedinShareButton,
    FacebookShareButton,
    EmailShareButton,
    WhatsappShareButton,
} from "react-share";
import {
    BsClipboard,
    BsFacebook,
    BsLinkedin,
    BsTelegram,
    BsTwitter,
    BsWhatsapp,
} from "react-icons/bs";
import { BiCopy, BiEdit } from "react-icons/bi";
import ProductReviewCard from "../Products/ProductReviewCard";

function AdminProductPage() {
    const dispatch = useDispatch();
    const { id } = useParams();
    useEffect(() => {
        dispatch(getProducts());
    }, []);

    function deleteProd() {
        dispatch(deleteProduct(id));
    }
    const products = useSelector((state) => state.product.products);
    const product = products.find((item) => item._id.toString() === id);
    const productLink = `http://localhost:3000/product/${id}`;
    return (
        <div className="product-page">
            <div className="product-page-image-container">
                {product &&
                    product.images &&
                    product.images.map((url, key) => (
                        <img
                            key={key}
                            src={url}
                            alt={product && product.title}
                            className="product-page-image"
                        />
                    ))}
            </div>
            <div className="product-page-info-container">
                <div className="product-page-top">
                    <div className="product-page-brand">
                        {product && product.brand}{" "}
                    </div>
                </div>
                <div className="product-page-title">
                    {product && product.title}
                </div>
                <div className="product-page-price-container">
                    <span className="product-page-price">
                        {" "}
                        ₹{product && product.price}{" "}
                    </span>
                    <span className="product-page-originalPrice">
                        <del> ₹{product && product.originalPrice} </del>
                    </span>
                    <span className="product-page-discount">
                        {Math.round(product && product.discount)}% Off
                    </span>
                </div>
                {product && product.ratings && product.ratings.length > 0 && (
                    <div className="product-page-star">
                        <AiFillStar className="star-icon" />
                        <span className="product-page-star-value">
                            {product &&
                                product.totalrating &&
                                product.totalrating.toFixed(1)}
                        </span>
                        <span>|</span>
                        <span className="product-page-star-count">
                            {" "}
                            {product &&
                                product.ratings &&
                                product.ratings.length}{" "}
                            ratings
                        </span>
                        <MdVerified className="verified-icon" />
                    </div>
                )}
                <div className="product-page-color">
                    <div className="product-page-key">Color :</div>{" "}
                    <div className="product-page-color-item">
                        <div
                            className="product-page-color-demo"
                            style={{
                                backgroundColor: product && product.color,
                            }}
                        ></div>
                        {product && product.color}
                    </div>
                </div>
                <div className="product-page-button-container">
                    <button className="button-full">
                        <NavLink to={`/admin/product/update/${id}`}>
                            <BiEdit />
                        </NavLink>
                    </button>
                    <button className="button-full" onClick={deleteProd}>
                        <MdDelete />
                    </button>
                </div>
                <div className="product-page-description">
                    <div className="product-page-key">Description : </div>
                    {product && product.description}
                </div>
                <div className="product-page-reviews-container">
                    <div className="product-page-key">Reviews : </div>
                    {product &&
                    product.ratings &&
                    product.ratings.length > 0 ? (
                        product.ratings.map((review, key) => (
                            <ProductReviewCard key={key} review={review} />
                        ))
                    ) : (
                        <Empty text="No Reviews Yet" />
                    )}
                </div>
            </div>
        </div>
    );
}

export default AdminProductPage;
