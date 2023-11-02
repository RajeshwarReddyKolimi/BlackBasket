import React, { useEffect, useState } from "react";
import CouponCard from "./CouponCard";
import { useDispatch, useSelector } from "react-redux";
import { createCoupon, getCoupons } from "../../Redux/Thunks/couponThunks";

function Coupons() {
    const dispatch = useDispatch();
    const [coupon, setCoupon] = useState({ name: "", date: null, discount: 0 });
    const couponsData = useSelector((state) => state.coupon.coupons);
    useEffect(() => {
        dispatch(getCoupons());
    }, [dispatch]);
    function create(e) {
        e.preventDefault();
        dispatch(createCoupon(coupon));
    }
    return (
        <div>
            <h3>Coupons</h3>
            <div className="">
                {couponsData &&
                    couponsData.map((coupon, key) => (
                        <CouponCard key={key} coupon={coupon} />
                    ))}
            </div>
            <form onSubmit={(e) => create(e)}>
                <input
                    type="text"
                    name="couponCode"
                    onChange={(e) =>
                        setCoupon((prev) => ({ ...prev, name: e.target.value }))
                    }
                />
                <input
                    type="date"
                    name="couponExpiry"
                    onChange={(e) =>
                        setCoupon((prev) => ({
                            ...prev,
                            expiry: new Date(e.target.value),
                        }))
                    }
                />
                <input
                    type="number"
                    name="couponDiscount"
                    onChange={(e) =>
                        setCoupon((prev) => ({
                            ...prev,
                            discount: e.target.value,
                        }))
                    }
                />
                <button onClick={create}>Create Coupon</button>
            </form>
        </div>
    );
}

export default Coupons;
