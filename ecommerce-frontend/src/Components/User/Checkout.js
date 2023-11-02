import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Navigate } from "react-router-dom";
import {
    applyCoupon,
    createOrder,
    getCart,
    getUserCoupons,
    getUserDetails,
} from "../../Redux/Thunks/userThunks";
import { getCoupons } from "../../Redux/Thunks/couponThunks";
import UserCouponCard from "./UserCouponCard";
import findToken from "../../findToken";
import axios from "axios";
import UserAddressCard from "./UserAddressCard";
import apiUrl from "../../apiUrl";

function Checkout() {
    const dispatch = useDispatch();
    const cartData = useSelector((state) => state.user.userData.cart);
    const userAddress = useSelector((state) => state.user.userData.address);

    const data = useSelector((state) => state.user.userData);
    const couponsData = useSelector((state) => state.user.userData.coupons);
    const [couponDiscount, setCouponDiscount] = useState(0);
    const [selectedCoupon, setSelectedCoupon] = useState("");
    const [selectedAddress, setSelectedAddress] = useState({});
    const [finalPrice, setFinalPrice] = useState(
        (cartData && cartData.totalPrice) | 0
    );
    useEffect(() => {
        dispatch(getUserDetails());
        dispatch(getCart());
        dispatch(getUserCoupons());
    }, [dispatch]);

    async function applyCpn(couponCode) {
        try {
            const token = await findToken();
            const response = await axios.put(
                `${apiUrl}/user/applyCoupon`,
                {
                    couponCode,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setSelectedCoupon(couponCode);
            setCouponDiscount(response.data.discount);
            setFinalPrice(response.data.finalPrice);
        } catch (error) {
            console.error("Fetch error:", error);
        }
    }
    function applyAddress(address) {
        setSelectedAddress(address);
    }
    function handleOrder() {
        dispatch(
            createOrder({
                couponCode: selectedCoupon,
                address: selectedAddress,
                finalPrice,
            })
        );
    }

    const isUserLogged = useSelector((state) => state.user.isUserLogged);
    if (!isUserLogged) return <Navigate to="/" replace />;
    return (
        <div>
            <div className="coupon-container">
                {couponsData && (
                    <div className="m-auto">
                        {couponsData.map((coupon, key) => (
                            <label key={key} className="d-flex flex-row">
                                <input
                                    type="radio"
                                    name="couponOptions"
                                    value={coupon.code}
                                    onChange={(e) => applyCpn(e.target.value)}
                                />
                                <UserCouponCard coupon={coupon.coupon} />
                            </label>
                        ))}
                    </div>
                )}
            </div>
            <div>
                {userAddress && (
                    <div className="m-auto">
                        {userAddress.map((address, key) => (
                            <label key={key} className="d-flex flex-row">
                                <input
                                    type="radio"
                                    name="addressOptions"
                                    value={address}
                                    onChange={(e) => applyAddress(address)}
                                />
                                <UserAddressCard address={address} />
                            </label>
                        ))}
                    </div>
                )}
            </div>
            <h3>Total : {cartData && cartData.totalPrice}</h3>
            <h3>Discount : {couponDiscount}</h3>
            <h3>Final : {finalPrice}</h3>
            <button onClick={handleOrder} className="button-1-full">
                Place Order
            </button>
        </div>
    );
}

export default Checkout;
