import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    addToCart,
    getUserDetails,
    removeFromSaveLater,
    toWishlist,
} from "../../Redux/Thunks/userThunks";
import { uploadProductImages } from "../../Redux/Thunks/productThunks";
import "../../styles/product.css";
import { AiFillHeart, AiFillStar } from "react-icons/ai";
import { NavLink, Navigate } from "react-router-dom";
import ConfirmPopup from "../ConfirmPopup";
import ResultPopup from "../ResultPopup";
import findToken from "../../findToken";
import axios from "axios";
import apiUrl from "../../apiUrl";
import { addItem } from "../../Redux/Reducers/authSlice";
import { MdVerified } from "react-icons/md";

function WishlistCard(props) {
    const [showCartMessage, setShowCartMessage] = useState(false);
    const { item } = props;
    const dispatch = useDispatch();
    const isUserLogged = useSelector((state) => state.user.isUserLogged);

    const id = item && item._id;
    useEffect(() => {
        dispatch(getUserDetails());
    }, [dispatch]);
    async function removeFromSaved() {
        dispatch(removeFromSaveLater(id));
    }
    async function addCart() {
        if (!isUserLogged) return <Navigate to="/user/login" replace />;
        try {
            const token = await findToken();
            const response = await axios.put(
                `${apiUrl}/product/cart`,
                {
                    productId: item._id,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            dispatch(addItem(response.data));
            setShowCartMessage(true);
        } catch (error) {
            console.log("Error:", error);
        }
    }

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
                <div className="button-container">
                    <button className="button-full" onClick={addCart}>
                        Add to Cart
                        {showCartMessage && (
                            <ResultPopup
                                successMessage={`Added to cart : ${item.title}`}
                                setFunction={setShowCartMessage}
                            />
                        )}
                    </button>
                    <button
                        className="button-danger-full"
                        onClick={removeFromSaved}
                    >
                        Remove
                    </button>
                </div>
            </div>
        </div>
    );
}

export default WishlistCard;
