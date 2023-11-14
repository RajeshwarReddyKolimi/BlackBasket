import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Navigate, useNavigate } from "react-router-dom";
import {
    applyCoupon,
    createOrder,
    getCart,
    getUserCoupons,
    getUserDetails,
} from "../../Redux/Thunks/userThunks";
import findToken from "../../findToken";
import axios from "axios";
import apiUrl from "../../apiUrl";
import "../../styles/checkout.css";
import "../../styles/forms.css";
import ResultPopup from "../ResultPopup";
import ConfirmPopup from "../ConfirmPopup";

function Checkout() {
    const dispatch = useDispatch();
    const cartData = useSelector((state) => state.user.userData.cart);
    const userAddress = useSelector((state) => state.user.userData.address);
    const data = useSelector((state) => state.user.userData);
    const coupons = useSelector((state) => state.user.userData.coupons);
    const [couponDiscount, setCouponDiscount] = useState(0);
    const [selectedCoupon, setSelectedCoupon] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [showPopup, setShowPopup] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState("");
    const [finalPrice, setFinalPrice] = useState(
        (cartData && cartData.totalPrice) | 0
    );
    useEffect(() => {
        dispatch(getUserDetails());
        dispatch(getCart());
        dispatch(getUserCoupons());
    }, [dispatch]);

    async function applyCoupon(e, couponCode) {
        e.preventDefault();
        try {
            const token = await findToken();
            const response = await axios.put(
                `${apiUrl}/user/applyCoupon`,
                {
                    couponCode,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setCouponDiscount(response.data.discount);
            setFinalPrice(response.data.finalPrice);
            setSuccessMessage(`Coupon Applied Successfully : ${couponCode}`);
        } catch (error) {
            setErrorMessage(`Invalid Coupon : ${couponCode}`);
            setCouponDiscount(0);
            setFinalPrice(cartData.totalPrice);
            console.error("Fetch error:", error);
        }
    }
    function applyAddress(address) {
        setSelectedAddress(address);
    }
    const navigate = useNavigate();

    function handleOrder() {
        dispatch(
            createOrder({
                couponCode: selectedCoupon,
                address: selectedAddress,
                finalPrice,
            })
        );
        navigate("/user/orders");
    }

    const isUserLogged = useSelector((state) => state.user.isUserLogged);
    if (!isUserLogged) return <Navigate to="/" replace />;
    if (!cartData || cartData.totalPrice < 1)
        return <Navigate to="/" replace />;
    return (
        <div className="checkout-page">
            <div className="checkout-options">
                <div className="checkout-address-container">
                    <div className="section-header">
                        <div className="header-title">Select Address</div>
                        <div>
                            <NavLink
                                className="button"
                                to={`/user/address/add`}
                            >
                                Add
                            </NavLink>
                        </div>
                    </div>
                    {userAddress && (
                        <div className="address-list">
                            {userAddress.map((address, key) => {
                                const formattedAddress = `${
                                    address.userName
                                        ? address.userName + "\n"
                                        : ""
                                }${
                                    address.houseNo
                                        ? address.houseNo + "\n"
                                        : ""
                                }${
                                    address.street ? address.street + "\n" : ""
                                }${
                                    address.village
                                        ? address.village + "\n"
                                        : ""
                                }${address.city ? address.city + "\n" : ""}${
                                    address.landmark
                                        ? address.landmark + "\n"
                                        : ""
                                }${
                                    address.pincode
                                        ? address.pincode + "\n"
                                        : ""
                                }${address.mobile}`;
                                return (
                                    <label
                                        key={key}
                                        className="address-label checkbox-label"
                                    >
                                        <input
                                            type="checkbox"
                                            value={formattedAddress}
                                            checked={selectedAddress.includes(
                                                formattedAddress
                                            )}
                                            className="checkbox-input"
                                            onChange={(e) =>
                                                setSelectedAddress(
                                                    e.target.value
                                                )
                                            }
                                        />
                                        <div className="address">
                                            {formattedAddress}
                                        </div>
                                        <div className="flex-buffer"></div>
                                        <NavLink
                                            className="button"
                                            to={`/user/address/update/${address._id}`}
                                        >
                                            Edit
                                        </NavLink>
                                    </label>
                                );
                            })}
                        </div>
                    )}
                </div>
                <div className="checkout-coupon-container">
                    <div className="section-header">
                        <div className="header-title">Select Coupon</div>
                    </div>
                    <form
                        className="form inline-form"
                        onSubmit={(e) => applyCoupon(e, selectedCoupon)}
                    >
                        <input
                            value={selectedCoupon}
                            type="text"
                            className="form-input"
                            name="coupon-code"
                            placeholder="Enter coupon code"
                            onChange={(e) => {
                                setSelectedCoupon(e.target.value);
                            }}
                        />
                        <button type="submit" className="button">
                            Apply
                        </button>
                    </form>
                    {coupons && (
                        <div className="coupon-list">
                            {coupons.map((coupon, key) => (
                                <label key={key} className="checkbox-label">
                                    <input
                                        type="checkbox"
                                        value={coupon.code}
                                        checked={selectedCoupon.includes(
                                            coupon.code
                                        )}
                                        className="checkbox-input"
                                        onChange={(e) => {
                                            setSelectedCoupon(e.target.value);
                                        }}
                                    />
                                    <div>{coupon.code}</div>
                                </label>
                            ))}
                        </div>
                    )}
                    <div className="final-price-container">
                        <div className="final-price-item">
                            <span className="final-price-key">Total : </span>{" "}
                            <span className="final-price-value">
                                ₹{cartData && cartData.totalPrice}
                            </span>
                        </div>
                        <div className="final-price-item">
                            <span className="final-price-key">Discount : </span>{" "}
                            <span className="final-price-value">
                                ₹{couponDiscount}
                            </span>
                        </div>
                        <div className="final-price-item">
                            <span className="final-price-key">Final : </span>{" "}
                            <span className="final-price-value">
                                ₹{finalPrice}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            {successMessage && successMessage !== "" && (
                <ResultPopup
                    successMessage={successMessage}
                    setFunction={setSuccessMessage}
                />
            )}
            {errorMessage && errorMessage !== "" && (
                <ResultPopup
                    errorMessage={errorMessage}
                    setFunction={setErrorMessage}
                />
            )}
            <button
                onClick={() => {
                    if (selectedAddress && selectedAddress !== "") {
                        if (
                            cartData &&
                            cartData.finalPrice &&
                            cartData.finalPrice !== 0
                        )
                            setShowPopup(true);
                        else setErrorMessage("Cart is Empty");
                    } else {
                        setErrorMessage("Address not selected");
                    }
                }}
                className="button-full"
            >
                Place Order
            </button>
            {showPopup && (
                <ConfirmPopup
                    action={handleOrder}
                    setShowPopup={setShowPopup}
                />
            )}
        </div>
    );
}

export default Checkout;
