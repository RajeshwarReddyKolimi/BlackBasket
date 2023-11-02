import React, { useEffect } from "react";
import { deleteCoupon, getCoupons } from "../../Redux/Thunks/couponThunks";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Navigate } from "react-router-dom";
import "../../styles/coupons.css";
import { MdContentCopy, MdDelete } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
function AdminCouponCard(props) {
    const { coupon } = props;
    const dispatch = useDispatch();
    let inputDate = new Date(null);
    if (coupon && coupon && coupon.expiry) inputDate = new Date(coupon.expiry);

    const options = {
        day: "2-digit",
        month: "short",
        year: "numeric",
    };

    const formattedExpiry = inputDate.toLocaleDateString("en-US", options);

    async function copyCode() {
        await navigator.clipboard.writeText(coupon.name);
    }

    function deleteCpn() {
        dispatch(deleteCoupon(coupon._id));
    }
    return (
        <div>
            {coupon ? (
                <div className="coupon-card">
                    <div className="coupon-code-container">
                        <h4 className="coupon-code">{coupon && coupon.name}</h4>
                        <MdContentCopy
                            onClick={copyCode}
                            className="copy-coupon"
                        />
                    </div>
                    <div>
                        Flat {coupon.discount}% off{" "}
                        {coupon.maxDiscount && (
                            <div>upto {coupon.maxDiscount}</div>
                        )}
                    </div>
                    <div>Valid Till : {formattedExpiry}</div>
                    <div className="coupon-button-container">
                        <NavLink
                            to={`/admin/coupon/update/${coupon._id}`}
                            className="button-1-full"
                        >
                            <BiEdit />
                        </NavLink>
                        <button className="button-1-full" onClick={deleteCpn}>
                            <MdDelete />
                        </button>
                    </div>
                </div>
            ) : (
                <h4>No coupons available</h4>
            )}
        </div>
    );
}

export default AdminCouponCard;
