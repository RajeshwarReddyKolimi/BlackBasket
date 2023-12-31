import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, getUserDetails } from "../../Redux/Thunks/userThunks";
import "../../styles/product.css";
import { AiFillHeart, AiFillStar } from "react-icons/ai";
import { NavLink, Navigate, useNavigate } from "react-router-dom";
import { MdVerified } from "react-icons/md";

function ProductCard(props) {
    const navigate = useNavigate();
    const { item } = props;
    const dispatch = useDispatch();
    const isUserLogged = useSelector((state) => state.user.isUserLogged);

    useEffect(() => {
        dispatch(getUserDetails());
    }, [dispatch]);

    async function addCart() {
        if (!isUserLogged) return navigate("/user/login");
        dispatch(addToCart(id));
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

            <div className="product-card-info-container">
                <NavLink to={`/product/${id}`}>
                    <div className="product-card-brand">
                        {item && item.brand}
                    </div>
                    <div className="product-card-title">
                        {item && item.title}
                    </div>
                </NavLink>
                {item && item.ratings && item.ratings.length > 0 ? (
                    <div className="product-star">
                        <AiFillStar className="star-icon" />
                        <span>
                            {item &&
                                item.totalrating &&
                                item.totalrating.toFixed(1)}
                        </span>
                        <span>|</span>
                        <span>
                            {" "}
                            {item && item.ratings && item.ratings.length}{" "}
                            ratings
                        </span>
                        <MdVerified className="verified-icon" />
                    </div>
                ) : (
                    <div>No Ratings Yet </div>
                )}
                <div className="product-price-container">
                    <div className="product-price">
                        {" "}
                        <span className="rupee-symbol">₹</span>
                        {item && item.price}{" "}
                    </div>

                    <span className="product-original-price">
                        <del>
                            {" "}
                            <span className="rupee-symbol">₹</span>
                            {item && item.originalPrice}{" "}
                        </del>
                    </span>
                    <span className="product-discount">
                        -{Math.round(item && item.discount)}%
                    </span>
                </div>
                <button className="button-full" onClick={addCart}>
                    Add to Cart
                </button>
            </div>
        </div>
    );
}

export default ProductCard;
