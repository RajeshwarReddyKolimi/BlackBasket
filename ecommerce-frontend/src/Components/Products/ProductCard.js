import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    addToCart,
    getUserDetails,
    toWishlist,
} from "../../Redux/Thunks/userThunks";
import { uploadProductImages } from "../../Redux/Thunks/productThunks";
import "../../styles/product.css";
import { AiFillHeart, AiFillStar } from "react-icons/ai";
import { NavLink, Navigate } from "react-router-dom";
import ConfirmPopup from "../ConfirmPopup";

function ProductCard(props) {
    const { item } = props;
    const dispatch = useDispatch();
    const isUserLogged = useSelector((state) => state.user.isUserLogged);

    useEffect(() => {
        dispatch(getUserDetails());
    }, []);
    function addCart() {
        if (!isUserLogged) return <Navigate to="/user/login" replace />;

        dispatch(addToCart(item._id));
    }
    function wishlist() {
        dispatch(toWishlist(item._id));
    }
    const id = item && item._id;

    return (
        <div className="product-card">
            <NavLink to={`/product/${id}`}>
                <div className="product-card-image-container">
                    <img
                        src={`${
                            item && item.images && item.images[0]
                                ? item.images[0]
                                : ""
                        }`}
                        alt="image"
                        className="product-card-poster-image"
                    />
                </div>
            </NavLink>
            <div className="product-card-rating">
                <span className="product-card-rating-value">
                    {item && item.totalrating && item.totalrating.toFixed(1)}
                </span>
                <AiFillStar className="product-card-rating-star" />
            </div>
            <div className="product-card-info">
                <NavLink to={`/product/${id}`}>
                    <div className="product-card-brand">
                        {item && item.brand}
                    </div>
                    <div className="product-card-title">
                        {item && item.title}
                    </div>
                </NavLink>
                <div className="product-card-price">
                    <div className="product-card-final-price">
                        {" "}
                        <span className="rupee-symbol">₹</span>
                        {item && item.price}{" "}
                    </div>

                    <span className="product-card-original-price">
                        <del>
                            {" "}
                            <span className="rupee-symbol">₹</span>
                            {item && item.originalPrice}{" "}
                        </del>
                    </span>
                    <span className="product-card-discount">
                        <span className="product-card-discount-value">
                            {Math.round(item && item.discount)}
                        </span>
                        % Off
                    </span>
                </div>
                <button className="button-1-full" onClick={addCart}>
                    Add to Cart
                </button>
            </div>
        </div>
    );
}

export default ProductCard;
