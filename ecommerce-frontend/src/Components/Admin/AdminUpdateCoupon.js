import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createCoupon, updateCoupon } from "../../Redux/Thunks/couponThunks";

import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import apiUrl from "../../apiUrl";

function AdminUpdateCoupon() {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [coupon, setCoupon] = useState({
        name: "",
        expiry: "",
        discount: 0,
        maxDiscount: 0,
    });
    useEffect(() => {
        getCouponById(id);
    }, []);
    async function getCouponById(id) {
        try {
            const response = await axios.get(`${apiUrl}/coupon/${id}`, {
                withCredentials: true,
            });
            const res = response.data;
            setCoupon({
                name: res.name,
                discount: res.discount,
                maxDiscount: res.maxDiscount && res.maxDiscount,
                expiry: new Date(res.expiry).toISOString().slice(0, 10),
            });
        } catch (error) {}
    }
    function handleUpdateCoupon(e) {
        e.preventDefault();
        dispatch(updateCoupon({ coupon, id }));
        navigate(-1);
    }
    return (
        <div>
            <form
                onSubmit={(e) => {
                    handleUpdateCoupon(e);
                }}
                className="form"
            >
                <div className="form-item">
                    <label for="product-name" className="form-label">
                        Code
                    </label>
                    <input
                        type="text"
                        name="product-name"
                        className="form-input"
                        onChange={(e) =>
                            setCoupon((prev) => {
                                return { ...prev, name: e.target.value };
                            })
                        }
                        defaultValue={coupon && coupon.name}
                        required
                    />
                </div>
                <div className="form-item">
                    <label for="product-discount" className="form-label">
                        Discount
                    </label>
                    <input
                        type="number"
                        name="product-discount"
                        className="form-input"
                        onChange={(e) =>
                            setCoupon((prev) => {
                                return {
                                    ...prev,
                                    discount: e.target.value,
                                };
                            })
                        }
                        value={coupon && coupon.discount}
                        min={0}
                        max={100}
                        required
                    />
                </div>
                <div className="form-item">
                    <label for="product-maxDiscount" className="form-label">
                        Maximum Discount
                    </label>
                    <input
                        type="number"
                        name="product-maxDiscount"
                        className="form-input"
                        onChange={(e) =>
                            setCoupon((prev) => {
                                return {
                                    ...prev,
                                    maxDiscount: e.target.value,
                                };
                            })
                        }
                        value={coupon && coupon.maxDiscount}
                        min={1}
                    />
                </div>
                <div className="form-item">
                    <label for="coupon-expiry" className="form-label">
                        Expiry
                    </label>
                    <input
                        type="date"
                        name="coupon-expiry"
                        className="form-input"
                        onChange={(e) =>
                            setCoupon((prev) => {
                                return { ...prev, expiry: e.target.value };
                            })
                        }
                        value={coupon && coupon.expiry}
                        required
                    />
                </div>
                <button type="submit" className="button-full">
                    Update
                </button>
            </form>
        </div>
    );
}

export default AdminUpdateCoupon;
