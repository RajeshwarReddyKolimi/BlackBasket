import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    removeFromCart,
    toWishlist,
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
function CartCard(props) {
    const { item } = props;
    const product = item.product;
    const dispatch = useDispatch();
    function updateProductQuantity(value) {
        dispatch(updateCartItemQuantity({ productId: product._id, value }));
    }

    function removeCart() {
        dispatch(removeFromCart(product._id));
    }
    function wishlist() {
        dispatch(toWishlist(product._id));
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
                    <AiOutlineMinus
                        className="button-icon"
                        onClick={() => updateProductQuantity(-1)}
                    />
                    <span className="cart-card-quantity">{item.quantity} </span>
                    <AiOutlinePlus
                        onClick={() => updateProductQuantity(1)}
                        className="button-icon"
                    />
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
                    <button onClick={removeCart} className="button-danger">
                        <MdDelete />
                        Remove
                    </button>
                    <button onClick={wishlist} className="button">
                        <MdSaveAlt />
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CartCard;
