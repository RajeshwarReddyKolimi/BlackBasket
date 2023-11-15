import React, { useEffect, useState } from "react";
import { deleteCoupon, getCoupons } from "../../Redux/Thunks/couponThunks";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Navigate } from "react-router-dom";
import "../../styles/coupons.css";
import { MdContentCopy, MdDelete } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
function AdminCouponCard(props) {
    const { coupon } = props;
    const [isExpired, setIsExpired] = useState(false);
    const dispatch = useDispatch();
    useEffect(() => {
        if (new Date(coupon.expiry).getTime() < Date.now()) {
            setIsExpired(true);
        }
    }, [dispatch, coupon]);
    let inputDate = new Date(null);
    if (coupon && coupon && coupon.expiry) {
        inputDate = new Date(coupon.expiry);
    }
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
                <div
                    className={`coupon-card ${
                        isExpired && "coupon-card-expired"
                    }`}
                >
                    <div
                        className={`coupon-code-container ${
                            isExpired && "coupon-code-container-expired"
                        }`}
                    >
                        <h4
                            className={`coupon-code ${
                                isExpired && "coupon-code-expired"
                            }`}
                        >
                            {coupon && coupon.name}
                        </h4>
                        <MdContentCopy
                            onClick={copyCode}
                            className="copy-coupon"
                        />
                    </div>
                    <div>
                        Flat {coupon.discount}% off{" "}
                        {coupon.maxDiscount && (
                            <span>upto {coupon.maxDiscount}</span>
                        )}
                    </div>
                    <div>
                        {isExpired
                            ? `Expired`
                            : `Valid Till : ${formattedExpiry}`}
                    </div>
                    <div className="coupon-button-container">
                        <NavLink
                            to={`/admin/coupon/update/${coupon._id}`}
                            className={` ${
                                isExpired
                                    ? "button-danger-full"
                                    : "button-success-full"
                            }`}
                        >
                            <BiEdit />
                            Edit
                        </NavLink>
                        <button
                            className={` ${
                                isExpired
                                    ? "button-danger-full"
                                    : "button-success-full"
                            }`}
                            onClick={deleteCpn}
                        >
                            <MdDelete />
                            Delete
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
