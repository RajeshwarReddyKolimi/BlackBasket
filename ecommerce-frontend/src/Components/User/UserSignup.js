import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userSignup } from "../../Redux/Thunks/userThunks";
import { NavLink, Navigate } from "react-router-dom";
import "../../styles/login.css";

function UserSignup() {
    const dispatch = useDispatch();
    const [userDetails, setUserDetails] = useState({
        firstName: "",
        lastName: "",
        email: "",
        mobile: "",
        password: "",
        confirmPassword: "",
    });

    const [errors, setErrors] = useState({
        firstName: "",
        lastName: "",
        email: "",
        mobile: "",
        password: "",
        confirmPassword: "",
    });

    const validatePassword = (password) => {
        const passwordPattern =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return passwordPattern.test(password);
    };

    const validateEmail = (email) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    };

    const validateMobile = (mobile) => {
        const mobilePattern = /^\d{10}$/;
        return mobilePattern.test(mobile);
    };

    const validateName = (name) => {
        return name.trim().length > 0;
    };

    const signup = (e) => {
        e.preventDefault();
        if (!validateName(userDetails.firstName)) {
            setErrors((prev) => ({
                ...prev,
                firstName: "required",
            }));
            return;
        }

        if (!validateName(userDetails.lastName)) {
            setErrors((prev) => ({
                ...prev,
                lastName: "required",
            }));
            return;
        }
        if (userDetails.email === "") {
            setErrors((prev) => ({ ...prev, email: "required" }));
            return;
        }
        if (!validateEmail(userDetails.email)) {
            setErrors((prev) => ({ ...prev, email: "Invalid email address" }));
            return;
        }
        if (userDetails.mobile === "") {
            setErrors((prev) => ({ ...prev, mobile: "required" }));
            return;
        }
        if (!validateMobile(userDetails.mobile)) {
            setErrors((prev) => ({ ...prev, mobile: "Invalid mobile number" }));
            return;
        }
        if (userDetails.password === "") {
            setErrors((prev) => ({ ...prev, password: "required" }));
            return;
        }

        if (!validatePassword(userDetails.password)) {
            setErrors((prev) => ({
                ...prev,
                password:
                    "Must be at least 8 characters long and include at least 1 lowercase letter, 1 uppercase letter, 1 digit, and 1 special character.",
            }));
            return;
        }
        if (userDetails.confirmPassword === "") {
            setErrors((prev) => ({ ...prev, confirmPassword: "required" }));
            return;
        }
        if (userDetails.password !== userDetails.confirmPassword) {
            setErrors((prev) => ({
                ...prev,
                confirmPassword: "Passwords do not match",
            }));
            return;
        }

        setErrors({
            firstName: "",
            lastName: "",
            email: "",
            mobile: "",
            password: "",
            confirmPassword: "",
        });

        dispatch(userSignup(userDetails));
    };

    const isUserLogged = useSelector((state) => state.user.isUserLogged);

    if (isUserLogged) return <Navigate to="/user/dashboard" replace />;

    return (
        <div className="login-page-overlay">
            <form onSubmit={signup} className="login-form">
                <div className="logo">
                    Black
                    <br />
                    Basket
                </div>
                <div className="login-form-header">User Signup</div>
                <div className="login-form-item">
                    <label
                        htmlFor="user-firstName"
                        className="login-form-label"
                    >
                        {" "}
                        First Name :
                    </label>
                    <input
                        type="text"
                        name="user-firstName"
                        className="login-form-input"
                        onChange={(e) => {
                            setUserDetails((prev) => ({
                                ...prev,
                                firstName: e.target.value,
                            }));

                            setErrors((prev) => ({ ...prev, firstName: "" }));
                        }}
                    />
                    <span className="form-error">{errors.firstName}</span>
                </div>
                <div className="login-form-item">
                    <label htmlFor="user-lastName" className="login-form-label">
                        {" "}
                        Last Name :
                    </label>
                    <input
                        type="text"
                        name="user-lastName"
                        className="login-form-input"
                        onChange={(e) => {
                            setUserDetails((prev) => ({
                                ...prev,
                                lastName: e.target.value,
                            }));
                            setErrors((prev) => ({ ...prev, lastName: "" }));
                        }}
                    />
                    <span className="form-error">{errors.lastName}</span>
                </div>
                <div className="login-form-item">
                    <label htmlFor="user-email" className="login-form-label">
                        {" "}
                        Email :
                    </label>
                    <input
                        type="text"
                        name="user-email"
                        className="login-form-input"
                        onChange={(e) => {
                            setUserDetails((prev) => ({
                                ...prev,
                                email: e.target.value,
                            }));
                            setErrors((prev) => ({ ...prev, email: "" }));
                        }}
                    />
                    <span className="form-error">{errors.email}</span>
                </div>
                <div className="login-form-item">
                    <label htmlFor="user-mobile" className="login-form-label">
                        {" "}
                        Mobile no. :
                    </label>
                    <input
                        type="text"
                        name="user-mobile"
                        className="login-form-input"
                        onChange={(e) => {
                            setUserDetails((prev) => ({
                                ...prev,
                                mobile: e.target.value,
                            }));
                            setErrors((prev) => ({ ...prev, mobile: "" }));
                        }}
                    />
                    <span className="form-error">{errors.mobile}</span>
                </div>
                <div className="login-form-item">
                    <label htmlFor="user-password" className="login-form-label">
                        {" "}
                        Password :
                    </label>
                    <input
                        type="password"
                        name="user-password"
                        className="login-form-input"
                        onChange={(e) => {
                            setUserDetails((prev) => ({
                                ...prev,
                                password: e.target.value,
                            }));
                            setErrors((prev) => ({ ...prev, password: "" }));
                        }}
                    />
                    <span className="form-error">{errors.password}</span>
                </div>
                <div className="login-form-item">
                    <label
                        htmlFor="user-re-password"
                        className="login-form-label"
                    >
                        {" "}
                        Confirm Password :
                    </label>
                    <input
                        type="password"
                        name="user-re-password"
                        className="login-form-input"
                        onChange={(e) => {
                            setUserDetails((prev) => ({
                                ...prev,
                                confirmPassword: e.target.value,
                            }));
                            setErrors((prev) => ({
                                ...prev,
                                confirmPassword: "",
                            }));
                        }}
                    />
                    <span className="form-error">{errors.confirmPassword}</span>
                </div>
                <button className="button-inverse-full">Signup</button>
                <div className="login-form-footer">
                    Already have an account?{" "}
                    <NavLink to="/user/login">Login</NavLink>
                </div>
            </form>
        </div>
    );
}

export default UserSignup;
