import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createCoupon } from "../../Redux/Thunks/couponThunks";
import { useNavigate } from "react-router-dom";

function AdminAddCoupon() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [coupon, setCoupon] = useState({
        name: "",
        expiry: null,
        discount: 0,
        maxDiscount: 0,
    });
    function handleAddCoupon(e) {
        e.preventDefault();
        dispatch(createCoupon(coupon));
        navigate(-1);
    }
    return (
        <div className="section">
            <div className="section-header">
                <div className="header-title">Add Coupon</div>
            </div>
            <form
                onSubmit={(e) => {
                    handleAddCoupon(e);
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
                                return { ...prev, discount: e.target.value };
                            })
                        }
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
                                return { ...prev, maxDiscount: e.target.value };
                            })
                        }
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
                        required
                    />
                </div>
                <button type="submit" className="button-full">
                    Create
                </button>
            </form>
        </div>
    );
}

export default AdminAddCoupon;
