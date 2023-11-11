import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Navigate } from "react-router-dom";
import { AiFillStar, AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import "../../styles/orders.css";
import findToken from "../../findToken";
import axios from "axios";
import apiUrl from "../../apiUrl";
import { BiSolidEditAlt } from "react-icons/bi";
function OrderProductCard(props) {
    const { item } = props;
    const [currentRating, setCurrentRating] = useState({
        star: 0,
        comment: "",
        productId: "",
        _id: "",
    });
    const product = item.product;
    const dispatch = useDispatch();
    useEffect(() => {
        getRating();
    }, []);
    async function getRating() {
        const token = await findToken();
        try {
            const response = await axios.get(
                `${apiUrl}/product/rating/${product._id}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setCurrentRating(response.data);

            return <Navigate to="/user/orders" replace />;
        } catch (error) {
            console.error("Fetch error:", error);
        }
    }
    const isUserLogged = useSelector((state) => state.user.isUserLogged);
    if (!isUserLogged) return <Navigate to="/" replace />;
    return (
        <div className="order-card">
            <div className="order-card-left">
                <NavLink to={`/product/${product._id}`}>
                    <div className="order-card-image-container">
                        <img
                            src={`${
                                product && product.images && product.images[0]
                                    ? product.images[0]
                                    : ""
                            }`}
                            alt="image"
                            className="order-card-poster-image"
                        />
                    </div>
                </NavLink>
                <div className="order-card-quantity">
                    Quantity: {item.quantity}{" "}
                </div>
            </div>
            <div className="order-card-info-container">
                <div className="order-card-brand">{product.brand}</div>
                <NavLink to={`/product/${product._id}`}>
                    <div className="order-card-title">{product.title}</div>
                </NavLink>
                <div className="order-card-price">
                    <span className="product-card-price">
                        {" "}
                        <span className="rupee-symbol">₹</span>
                        {product.price}{" "}
                    </span>
                </div>

                {currentRating &&
                    currentRating.star &&
                    currentRating.star !== 0 && (
                        <div className="order-card-rating">
                            <div>
                                <span className="order-card-rating-header">
                                    My Rating:
                                </span>
                                {Array(currentRating.star)
                                    .fill(null)
                                    .map((_, index) => (
                                        <AiFillStar
                                            key={index}
                                            className="star-icon"
                                        />
                                    ))}
                            </div>
                        </div>
                    )}
                <div className="button-container ">
                    {currentRating &&
                    currentRating.star &&
                    currentRating.star !== 0 ? (
                        <NavLink
                            className="button"
                            to={`/user/rating/edit/${product._id}`}
                        >
                            Edit Review
                        </NavLink>
                    ) : (
                        <NavLink
                            className="button"
                            to={`/user/rating/${product._id}`}
                        >
                            Add Review
                        </NavLink>
                    )}
                </div>
            </div>
        </div>
    );
}

export default OrderProductCard;
