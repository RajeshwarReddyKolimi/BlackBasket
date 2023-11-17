import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { NavLink, Navigate } from "react-router-dom";
import CartCard from "./CartCard";
import "../../styles/product.css";
import "../../styles/cart.css";
import { getUserDetails, getCart } from "../../Redux/Thunks/userThunks";
import Empty from "../Empty";

function Cart() {
    const dispatch = useDispatch();
    const isUserLogged = useSelector((state) => state.user.isUserLogged);
    const cartData = useSelector((state) => state.user.userData.cart);

    const loading = useSelector((state) => state.user.cartLoading);
    useEffect(() => {
        dispatch(getUserDetails());
        dispatch(getCart());
    }, [dispatch]);

    if (!isUserLogged) return <Navigate to="/user/login" replace />;

    return (
        <div className="cart-page">
            <div className="header-title">Products</div>
            {cartData && cartData.items && cartData.items.length > 0 ? (
                <div className="cart-products-container">
                    {loading ? (
                        <div className="loading"></div>
                    ) : (
                        cartData.items.map((item, key) => (
                            <CartCard key={key} item={item} />
                        ))
                    )}
                </div>
            ) : (
                <Empty text="Cart is Empty" />
            )}

            <div className="final-price-container">
                <div className="final-price-item">
                    <div className="final-price-key">Cart Value :</div>
                    <div className="final-price-value">
                        ₹{cartData && cartData.totalPrice}
                    </div>
                </div>
            </div>
            {cartData && cartData.items && cartData.items.length > 0 ? (
                <NavLink to="/user/checkout" className="button-full">
                    Checkout
                </NavLink>
            ) : (
                <button className="button-full button-disabled" disabled>
                    Checkout
                </button>
            )}
        </div>
    );
}

export default Cart;
