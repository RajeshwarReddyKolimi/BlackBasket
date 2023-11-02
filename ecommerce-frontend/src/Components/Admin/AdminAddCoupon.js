import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createCoupon } from "../../Redux/Thunks/couponThunks";

function AdminAddCoupon() {
    const dispatch = useDispatch();
    const [coupon, setCoupon] = useState({
        name: "",
        expiry: null,
        discount: 0,
        maxDiscount: 0,
    });
    function handleAddCoupon(e) {
        e.preventDefault();
        dispatch(createCoupon(coupon));
    }
    return (
        <div>
            <form
                onSubmit={(e) => {
                    handleAddCoupon(e);
                }}
                className="add-product-form"
            >
                <div className="product-form-item">
                    <label for="product-name" className="product-form-label">
                        Code
                    </label>
                    <input
                        type="text"
                        name="product-name"
                        className="product-form-input"
                        onChange={(e) =>
                            setCoupon((prev) => {
                                return { ...prev, name: e.target.value };
                            })
                        }
                        required
                    />
                </div>
                <div className="product-form-item">
                    <label
                        for="product-discount"
                        className="product-form-label"
                    >
                        Discount
                    </label>
                    <input
                        type="number"
                        name="product-discount"
                        className="product-form-input"
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
                <div className="product-form-item">
                    <label
                        for="product-maxDiscount"
                        className="product-form-label"
                    >
                        Maximum Discount
                    </label>
                    <input
                        type="number"
                        name="product-maxDiscount"
                        className="product-form-input"
                        onChange={(e) =>
                            setCoupon((prev) => {
                                return { ...prev, maxDiscount: e.target.value };
                            })
                        }
                        min={1}
                    />
                </div>
                <div className="product-form-item">
                    <label for="coupon-expiry" className="product-form-label">
                        Expiry
                    </label>
                    <input
                        type="date"
                        name="coupon-expiry"
                        className="product-form-input"
                        onChange={(e) =>
                            setCoupon((prev) => {
                                return { ...prev, expiry: e.target.value };
                            })
                        }
                        required
                    />
                </div>
                <button type="submit" className="button-1-full">
                    Create
                </button>
            </form>
        </div>
    );
}

export default AdminAddCoupon;
