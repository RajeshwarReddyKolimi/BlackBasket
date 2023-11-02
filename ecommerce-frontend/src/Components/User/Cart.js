import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { NavLink, Navigate } from "react-router-dom";
import CartCard from "./CartCard";
import UserCouponCard from "./UserCouponCard";
import CartCouponCard from "./CartCouponCard";
import "../../styles/product.css";
import "../../styles/cart.css";
import {
    getUserDetails,
    getCart,
    applyCoupon,
    createOrder,
} from "../../Redux/Thunks/userThunks";
import { getCoupons } from "../../Redux/Thunks/couponThunks";
import UserCoupons from "./UserCoupons";
import Empty from "../Empty";

function Cart() {
    const dispatch = useDispatch();
    const isUserLogged = useSelector((state) => state.user.isUserLogged);
    const cartData = useSelector((state) => state.user.userData.cart);
    const couponsData = useSelector((state) => state.user.userData.coupons);

    const [selectedCoupon, setSelectedCoupon] = useState("");

    useEffect(() => {
        dispatch(getUserDetails());
        dispatch(getCart());
    }, [dispatch]);

    if (!isUserLogged) return <Navigate to="/" replace />;

    return (
        <div className="cart-page">
            <h2>Cart Products</h2>
            {cartData && cartData.items && cartData.items.length > 0 ? (
                <div className="cart-products-container">
                    {cartData.items.map((item, key) => (
                        <CartCard key={key} item={item} />
                    ))}
                </div>
            ) : (
                <Empty text="Cart is Empty" />
            )}

            <div className="cart-value">
                Cart Value : ₹{cartData && cartData.totalPrice}
            </div>
            {/* <h3>Final Price: {cartData && cartData.finalPrice}</h3> */}

            {cartData && cartData.items && cartData.items.length > 0 && (
                <NavLink to="/user/checkout" className="button-1-full">
                    Checkout
                </NavLink>
            )}
        </div>
    );
}

export default Cart;
