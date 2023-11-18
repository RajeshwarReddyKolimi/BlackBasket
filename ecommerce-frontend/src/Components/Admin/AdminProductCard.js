import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteProduct } from "../../Redux/Thunks/productThunks";
import "../../styles/product.css";
import { AiFillStar } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import { BiSolidEditAlt } from "react-icons/bi";
import { MdDelete, MdVerified } from "react-icons/md";
import ConfirmPopup from "../ConfirmPopup";
function AdminProductCard(props) {
    const { item } = props;
    const [showConfirmPopup, setShowConfirmPopup] = useState(false);
    const dispatch = useDispatch();
    function deleteProd() {
        dispatch(deleteProduct(item._id));
    }
    const id = item && item._id;
    return (
        <div className="product-card">
            <NavLink to={`/admin/product/${id}`}>
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
                <NavLink to={`/admin/product/${id}`}>
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
                    <NavLink
                        to={`/admin/product/update/${id}`}
                        className="button"
                    >
                        <BiSolidEditAlt />
                        Edit
                    </NavLink>
                    <button
                        className="button-danger"
                        onClick={() => setShowConfirmPopup(true)}
                    >
                        <MdDelete />
                        Delete
                    </button>

                    {showConfirmPopup && (
                        <ConfirmPopup
                            action={deleteProd}
                            text="Are you sure you want to delete Product?"
                            setShowConfirmPopup={setShowConfirmPopup}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

export default AdminProductCard;
