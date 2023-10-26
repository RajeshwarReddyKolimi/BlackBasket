import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { NavLink, Navigate } from "react-router-dom";
import CartCard from "./CartCard";
import UserCouponCard from "./UserCouponCard";
import CartCouponCard from "./CartCouponCard";
import {
    getUserDetails,
    getCart,
    applyCoupon,
    createOrder,
} from "../../Redux/Thunks/userThunks";
import { getCoupons } from "../../Redux/Thunks/couponThunks";

function Cart() {
    const dispatch = useDispatch();
    const isUserLogged = useSelector((state) => state.user.isUserLogged);
    const cartData = useSelector((state) => state.user.userData.cart);
    const couponsData = useSelector((state) => state.user.userData.coupons);

    const [selectedCoupon, setSelectedCoupon] = useState("");

    useEffect(() => {
        dispatch(getUserDetails());
        dispatch(getCart());
        dispatch(getCoupons());
    }, [dispatch]);

    if (!isUserLogged) return <Navigate to="/" replace />;

    async function apply(couponId) {
        setSelectedCoupon(couponId);
        dispatch(applyCoupon(couponId));
    }
    function handleOrder() {
        dispatch(createOrder(selectedCoupon));
    }
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

            <div className="">
                {couponsData && (
                    <div className="m-auto">
                        {couponsData.map((id, key) => (
                            <label key={key} className="d-flex flex-row">
                                <input
                                    type="radio"
                                    name="couponOptions"
                                    value={id}
                                    onChange={(e) => apply(e.target.value)}
                                />
                                <CartCouponCard id={id} />
                            </label>
                        ))}
                    </div>
                )}
            </div>

            <h3>Total Price: {cartData && cartData.totalPrice}</h3>
            <h3>Final Price: {cartData && cartData.finalPrice}</h3>
            <button onClick={handleOrder}>Confirm Order</button>
        </div>
    );
}

export default Cart;
