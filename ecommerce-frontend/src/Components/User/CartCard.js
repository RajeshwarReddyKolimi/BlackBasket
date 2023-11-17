import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    addToSaveLater,
    removeFromCart,
    updateCartItemQuantity,
} from "../../Redux/Thunks/userThunks";
import { NavLink, Navigate } from "react-router-dom";
import {
    AiFillDelete,
    AiFillStar,
    AiOutlineMinus,
    AiOutlinePlus,
} from "react-icons/ai";
import { MdDelete, MdSaveAlt } from "react-icons/md";
import "../../styles/product.css";
import "../../styles/cart.css";
import ConfirmPopup from "../ConfirmPopup";
import { setSuccessMessage } from "../../Redux/Reducers/globalSlice";
function CartCard(props) {
    const [showConfirmPopup, setShowConfirmPopup] = useState(false);
    const { item } = props;
    const product = item.product;
    const dispatch = useDispatch();
    function updateProductQuantity(value) {
        dispatch(updateCartItemQuantity({ productId: product._id, value }));
    }
    function removeCart() {
        dispatch(removeFromCart(product._id));
        dispatch(setSuccessMessage("Removed from Cart"));
    }
    function wishlist() {
        dispatch(addToSaveLater(product._id));
        dispatch(setSuccessMessage("Added to Save later"));
    }
    const isUserLogged = useSelector((state) => state.user.isUserLogged);
    if (!isUserLogged) return <Navigate to="/" replace />;
    return (
        <div className="cart-card">
            <div className="cart-card-left">
                <NavLink to={`/product/${product._id}`}>
                    <div className="cart-card-image-container">
                        <img
                            src={`${
                                product && product.images && product.images[0]
                                    ? product.images[0]
                                    : ""
                            }`}
                            alt="image"
                            className="cart-card-poster-image"
                        />
                    </div>
                </NavLink>
                <div className="button-container-flex">
                    <div className="button-icon">
                        <AiOutlineMinus
                            className="reaact-icon"
                            onClick={() => updateProductQuantity(-1)}
                        />
                    </div>
                    <span className="cart-card-quantity">{item.quantity} </span>
                    <div className="button-icon">
                        <AiOutlinePlus
                            className="reaact-icon"
                            onClick={() => updateProductQuantity(1)}
                        />
                    </div>
                </div>
            </div>
            <div className="cart-card-info-container">
                <div className="cart-card-brand">{product.brand}</div>
                <NavLink to={`/product/${product._id}`}>
                    <div className="cart-card-title">{product.title}</div>
                </NavLink>
                <div className="product-star">
                    <AiFillStar className="star-icon" />
                    <span>
                        {product &&
                            product.totalrating &&
                            product.totalrating.toFixed(1)}
                    </span>
                </div>
                <div className="product-price-container">
                    <span className="product-price">
                        {" "}
                        ₹{product && product.price}{" "}
                    </span>
                    <span className="product-original-price">
                        <del> ₹{product && product.originalPrice} </del>
                    </span>
                    <span className="product-discount">
                        {Math.round(product && product.discount)}% Off
                    </span>
                </div>
                <div className="button-container ">
                    <button
                        onClick={() => setShowConfirmPopup(true)}
                        className="button-danger cart-button"
                    >
                        <MdDelete />
                        Remove
                    </button>
                    <button onClick={wishlist} className="button cart-button">
                        <MdSaveAlt />
                        Save
                    </button>
                    {showConfirmPopup && (
                        <ConfirmPopup
                            action={removeCart}
                            text="Are you sure to remove from cart?"
                            setShowConfirmPopup={setShowConfirmPopup}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

export default CartCard;
