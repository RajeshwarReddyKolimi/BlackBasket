import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCoupon, getCoupons } from "../../Redux/Thunks/couponThunks";
import { getUserDetails } from "../../Redux/Thunks/userThunks";
import { NavLink, Navigate } from "react-router-dom";
import "../../styles/coupons.css";
import AdminCouponCard from "./AdminCouponCard";
function AdminCoupons() {
    const dispatch = useDispatch();
    const couponsData = useSelector((state) => state.coupon.coupons);
    useEffect(() => {
        dispatch(getCoupons());
    }, [dispatch]);
    return (
        <div className="section">
            <div className="section-header">
                <div className="header-title">Coupons</div>
                <NavLink to="/admin/coupon/add" className="button">
                    Add Coupon
                </NavLink>
            </div>
            {couponsData && couponsData.length > 0 ? (
                <div className="coupon-container">
                    {couponsData.map((coupon, key) => (
                        <AdminCouponCard key={key} coupon={coupon} />
                    ))}
                </div>
            ) : (
                <div>No Coupons available</div>
            )}
        </div>
    );
}

export default AdminCoupons;
