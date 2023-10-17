import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux";
import CartCard from "./CartCard";
import { getCart } from "../../Redux/Thunks/userThunks";
import { NavLink, Navigate } from "react-router-dom";
function Cart() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCart());
    }, [dispatch]);
    const cartData = useSelector((state) => state.user.userData.cart);
    const isUserLogged = useSelector((state) => state.user.isUserLogged);
    if (!isUserLogged) return <Navigate to="/" replace />;
    return (
        <div>
            <h2>Cart Products</h2>
            <div className="container-sm w-50 d-flex flex-row flex-wrap">
                {cartData &&
                    cartData.items &&
                    cartData.items.map((item, key) => (
                        <CartCard key={key} item={item} />
                    ))}
            </div>
            <h3>Total Price: {cartData && cartData.totalPrice}</h3>
            <NavLink to="/checkout">Checkout</NavLink>
        </div>
    );
}

export default Cart;
