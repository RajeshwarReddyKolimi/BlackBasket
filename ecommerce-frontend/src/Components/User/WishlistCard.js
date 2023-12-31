import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromSaveLater } from "../../Redux/Thunks/userThunks";
import "../../styles/product.css";
import { AiFillStar } from "react-icons/ai";
import { NavLink, useNavigate } from "react-router-dom";
import ConfirmPopup from "../ConfirmPopup";
import { MdDelete, MdVerified } from "react-icons/md";

function WishlistCard(props) {
    const navigate = useNavigate();
    const [showConfirmPopup, setShowConfirmPopup] = useState(false);
    const { item } = props;
    const dispatch = useDispatch();
    const isUserLogged = useSelector((state) => state.user.isUserLogged);
    const id = item && item._id;
    async function removeFromSaved() {
        if (!isUserLogged) return navigate("/user/login");
        dispatch(removeFromSaveLater(id));
    }
    async function addCart() {
        if (!isUserLogged) return navigate("/user/login");
        dispatch(addToCart(id));
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
                        alt=""
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
                    <button className="button cart-button" onClick={addCart}>
                        Add to Cart
                    </button>
                    <button
                        className="button-danger cart-button"
                        onClick={() => setShowConfirmPopup(true)}
                    >
                        <MdDelete />
                        Remove
                    </button>
                    {showConfirmPopup && (
                        <ConfirmPopup
                            action={removeFromSaved}
                            text="Are you sure to remove from Saved for Later?"
                            setShowConfirmPopup={setShowConfirmPopup}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

export default WishlistCard;
