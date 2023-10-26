import React, { useEffect } from "react";
import { deleteCoupon, getCoupons } from "../../Redux/Thunks/couponThunks";
import { useDispatch, useSelector } from "react-redux";

function UserCouponCard(props) {
    const { id } = props;
    const couponData = useSelector((state) => state.coupon.coupons);
    const coupon = couponData.filter(
        (coupon) => coupon._id.toString() === id.toString()
    );
    return (
        <div>
            {coupon && coupon[0] ? (
                <div className="container-sm border border-dark m-2">
                    <h4>{coupon[0].name}</h4>
                    <h5>{coupon[0].expiry}</h5>
                    <h4>{coupon[0].discount}</h4>
                </div>
            ) : (
                <h4>No coupons available</h4>
            )}
        </div>
    );
}

export default UserCouponCard;
