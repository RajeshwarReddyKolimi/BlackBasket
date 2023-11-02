import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    removeFromCart,
    toWishlist,
    updateCartItemQuantity,
} from "../../Redux/Thunks/userThunks";
import { NavLink, Navigate } from "react-router-dom";
import { AiFillStar, AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import "../../styles/product.css";
import "../../styles/cart.css";
import { MdDelete } from "react-icons/md";
import { BiHeart } from "react-icons/bi";
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

            <div className="cart-card-info-container">
                <div className="cart-card-brand">{product.brand}</div>
                <NavLink to={`/product/${product._id}`}>
                    <div className="cart-card-title">{product.title}</div>
                </NavLink>
                <div className="cart-card-rating">
                    <AiFillStar className="cart-card-rating-star" />
                    <span className="cart-card-rating-value">
                        {product &&
                            product.totalrating &&
                            product.totalrating.toFixed(1)}
                    </span>
                </div>
                <div className="cart-card-price">
                    <span className="product-card-final-price">
                        {" "}
                        <span className="rupee-symbol">₹</span>
                        {product.price}{" "}
                    </span>

                    <span className="product-card-original-price">
                        <del>
                            {" "}
                            <span className="rupee-symbol">₹</span>
                            {product.originalPrice}{" "}
                        </del>
                    </span>
                    <span className="product-card-discount">
                        <span className="product-card-discount-value">
                            {Math.round(product.discount)}
                        </span>
                        % Off
                    </span>
                </div>
                <div>
                    <AiOutlineMinus
                        className="button-icon-1"
                        onClick={() => updateProductQuantity(-1)}
                    />
                    <span className="cart-card-quantity">
                        Quantity: {item.quantity}{" "}
                    </span>
                    <AiOutlinePlus
                        onClick={() => updateProductQuantity(1)}
                        className="button-icon-1"
                    />
                </div>
                <div className="cart-button-container">
                    <button onClick={removeCart} className="button-danger-1">
                        Remove from Cart
                    </button>
                    <button onClick={wishlist} className="button-1">
                        Add to Wishlist
                    </button>
                </div>
                <div className="button-container-flex"></div>
            </div>
        </div>
    );
}

export default CartCard;
