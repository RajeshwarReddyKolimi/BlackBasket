import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, Navigate, useParams } from "react-router-dom";
import { getProducts } from "../../Redux/Thunks/productThunks";
import { AiFillStar } from "react-icons/ai";
import { IoIosShareAlt } from "react-icons/io";
import {
    addToCart,
    getUserDetails,
    toWishlist,
} from "../../Redux/Thunks/userThunks";
import { MdEmail, MdVerified } from "react-icons/md";
import ProductReviewCard from "./ProductReviewCard";
import Empty from "../Empty";
import ConfirmPopup from "../ConfirmPopup";
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
import { BiCopy } from "react-icons/bi";

function ProductPage() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const isUserLogged = useSelector((state) => state.user.isUserLogged);
    const [showPopup, setShowPopup] = useState(false);
    useEffect(() => {
        dispatch(getProducts());
        dispatch(getUserDetails());
    }, []);
    function addCart() {
        if (!isUserLogged) return <Navigate to="/user/login" replace />;

        dispatch(addToCart(product._id));
    }
    function wishlist() {
        dispatch(toWishlist(product._id));
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
                    <div className="product-share">
                        <IoIosShareAlt className="share-icon" />
                        <div className="share-options">
                            <TwitterShareButton
                                url={productLink}
                                title="Check this Product"
                                className="share-option"
                                target="_blank"
                            >
                                <BsTwitter
                                    className="share-option-icon"
                                    style={{ color: "" }}
                                />
                            </TwitterShareButton>
                            <TelegramShareButton
                                url={productLink}
                                title="Check this Product"
                                className="share-option"
                                target="_blank"
                            >
                                <BsTelegram
                                    className="share-option-icon"
                                    style={{ color: "" }}
                                />
                            </TelegramShareButton>
                            <LinkedinShareButton
                                url={productLink}
                                title="Check this Product"
                                className="share-option"
                                target="_blank"
                            >
                                <BsLinkedin
                                    className="share-option-icon"
                                    style={{ color: "" }}
                                />
                            </LinkedinShareButton>
                            <FacebookShareButton
                                url={productLink}
                                title="Check this Product"
                                className="share-option"
                                target="_blank"
                            >
                                <BsFacebook
                                    className="share-option-icon"
                                    style={{ color: "" }}
                                />
                            </FacebookShareButton>
                            <EmailShareButton
                                url={productLink}
                                title="Check this Product"
                                className="share-option"
                                target="_blank"
                            >
                                <MdEmail
                                    className="share-option-icon"
                                    style={{ color: "" }}
                                />
                            </EmailShareButton>
                            <WhatsappShareButton
                                url={productLink}
                                title="Check this Product"
                                className="share-option"
                                target="_blank"
                            >
                                <BsWhatsapp
                                    className="share-option-icon"
                                    style={{ color: "" }}
                                />
                            </WhatsappShareButton>
                            <div
                                className="share-option"
                                onClick={async () =>
                                    await navigator.clipboard.writeText(
                                        productLink
                                    )
                                }
                            >
                                <BiCopy
                                    className="share-option-icon"
                                    style={{ color: "" }}
                                />
                            </div>
                        </div>
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
                <div className="button-container-flex">
                    <button
                        className="button-1-full"
                        onClick={() => {
                            setShowPopup(true);
                        }}
                    >
                        Add to Cart
                    </button>
                    {showPopup && (
                        <ConfirmPopup
                            action={addCart}
                            setShowPopup={setShowPopup}
                        />
                    )}
                    <button className="button-1-full" onClick={wishlist}>
                        Wishlist
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

export default ProductPage;
