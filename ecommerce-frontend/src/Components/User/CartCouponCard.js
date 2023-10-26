import React, { useEffect } from "react";
import { deleteCoupon, getCoupons } from "../../Redux/Thunks/couponThunks";
import { useDispatch, useSelector } from "react-redux";

function CartCouponCard(props) {
    const { id } = props;
    const couponData = useSelector((state) => state.coupon.coupons);
    const coupon = couponData.filter(
        (coupon) => coupon._id.toString() === id.toString()
    );
    let formattedDate = ` - `;
    if (coupon && coupon[0] && coupon[0].expiry) {
        const date = new Date(coupon[0].expiry);

        const monthNames = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ];
        const day = date.getDate();
        const month = date.getMonth();
        const year = date.getFullYear();
        formattedDate = `${day} ${monthNames[month]} ${year}`;
    }
    return (
        <div>
            {coupon && coupon[0] ? (
                <div className="container-sm border border-dark m-2">
                    <h4>{coupon[0].name}</h4>
                    <h5>{formattedDate}</h5>
                    <h4>{coupon[0].discount} %</h4>
                    <h4>{coupon[0]._id}</h4>
                </div>
            ) : (
                <h4>No coupons available</h4>
            )}
        </div>
    );
}

export default CartCouponCard;
