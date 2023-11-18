import React, { useEffect, useState } from "react";
import { deleteCoupon } from "../../Redux/Thunks/couponThunks";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import "../../styles/coupons.css";
import { MdContentCopy, MdDelete } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
import ConfirmPopup from "../ConfirmPopup";
function AdminCouponCard(props) {
    const { coupon } = props;
    const [isExpired, setIsExpired] = useState(false);
    const [showConfirmPopup, setShowConfirmPopup] = useState(false);
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
            {coupon && (
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
                            className={` button-full
                            `}
                        >
                            <BiEdit />
                            Edit
                        </NavLink>
                        <button
                            className={` button-danger-full`}
                            onClick={() => setShowConfirmPopup(true)}
                        >
                            <MdDelete />
                            Delete
                        </button>
                        {showConfirmPopup && (
                            <ConfirmPopup
                                action={deleteCpn}
                                text="Are you sure you want to delete Coupon?"
                                setShowConfirmPopup={setShowConfirmPopup}
                            />
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default AdminCouponCard;
