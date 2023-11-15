import React from "react";
import { deleteCoupon } from "../../Redux/Thunks/couponThunks";
import { useDispatch } from "react-redux";

function CouponCard(props) {
    const { coupon } = props;
    const dispatch = useDispatch();
    function deleteCpn() {
        dispatch(deleteCoupon(coupon._id));
    }
    return (
        <div className="coupon-container">
            <h4>{coupon.name}</h4>
            <h5>{coupon.expiry}</h5>
            <h4>{coupon.discount}</h4>
            <button onClick={deleteCpn}>Delete</button>
        </div>
    );
}

export default CouponCard;
