import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "../../styles/coupons.css";
import { MdContentCopy } from "react-icons/md";
import { setSuccessMessage } from "../../Redux/Reducers/globalSlice";
function UserCouponCard(props) {
    const { coupon } = props;
    const [isExpired, setIsExpired] = useState(false);
    const dispatch = useDispatch();
    useEffect(() => {
        if (
            coupon &&
            coupon.expiry &&
            new Date(coupon.expiry).getTime() < Date.now()
        ) {
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
        dispatch(setSuccessMessage("Copied"));
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
                </div>
            )}
        </div>
    );
}

export default UserCouponCard;
