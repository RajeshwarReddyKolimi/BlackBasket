import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCoupon, getCoupons } from "../../Redux/Thunks/couponThunks";
import UserCouponCard from "./UserCouponCard";
import { getUserDetails } from "../../Redux/Thunks/userThunks";

function UserCoupons() {
    const dispatch = useDispatch();
    const couponsData = useSelector((state) => state.user.userData.coupons);
    useEffect(() => {
        dispatch(getUserDetails());
        dispatch(getCoupons());
    }, []);
    return (
        <div>
            <h3>My Coupons</h3>
            <div className="container-sm w-50 d-flex flex-row flex-wrap">
                {couponsData &&
                    couponsData.map((id, key) => (
                        <UserCouponCard key={key} id={id} />
                    ))}
            </div>
        </div>
    );
}

export default UserCoupons;
