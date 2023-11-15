import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCoupon, getCoupons } from "../../Redux/Thunks/couponThunks";
import UserCouponCard from "./UserCouponCard";
import { getUserCoupons, getUserDetails } from "../../Redux/Thunks/userThunks";
import { Navigate } from "react-router-dom";
import "../../styles/coupons.css";
function UserCoupons() {
    const dispatch = useDispatch();
    const isUserLogged = useSelector((state) => state.user.isUserLogged);
    const couponsData = useSelector((state) => state.user.userData.coupons);
    useEffect(() => {
        dispatch(getUserDetails());
        dispatch(getUserCoupons());
    }, [dispatch]);
    if (!isUserLogged) return <Navigate to="/user/login" replace />;
    return (
        <div className="section">
            <div className="header-title">My Coupons</div>
            {couponsData && couponsData.length > 0 ? (
                <div className="coupon-container">
                    {couponsData.map((coupon, key) => (
                        <UserCouponCard key={key} coupon={coupon.coupon} />
                    ))}
                </div>
            ) : (
                <div>No Coupons available</div>
            )}
        </div>
    );
}

export default UserCoupons;
