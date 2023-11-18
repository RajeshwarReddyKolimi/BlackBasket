import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { guestLogin, userLogin } from "../../Redux/Thunks/userThunks";
import { NavLink, Navigate } from "react-router-dom";
import "../../styles/login.css";
function UserLogin() {
    const dispatch = useDispatch();
    const [credentials, setCredentials] = useState({
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState({
        email: "",
        password: "",
    });
    const handleGuestLogin = () => {
        dispatch(guestLogin());
    };
    const validatePassword = (password) => {
        const passwordPattern =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return passwordPattern.test(password);
    };

    const validateEmail = (email) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    };

    const login = (e) => {
        e.preventDefault();
        if (credentials.email === "") {
            setErrors((prev) => ({ ...prev, email: "required" }));
            return;
        }
        if (!credentials.email || !validateEmail(credentials.email)) {
            setErrors((prev) => ({ ...prev, email: "Invalid email address" }));
            return;
        }
        if (credentials.password === "") {
            setErrors((prev) => ({ ...prev, password: "required" }));
            return;
        }
        if (!credentials.password || !validatePassword(credentials.password)) {
            setErrors((prev) => ({
                ...prev,
                password:
                    "Must be at least 8 characters long and include at least 1 lowercase letter, 1 uppercase letter, 1 digit, and 1 special character.",
            }));
            return;
        }

        setErrors({
            email: "",
            password: "",
        });

        dispatch(userLogin(credentials));
    };

    const isUserLogged = useSelector((state) => state.user.isUserLogged);
    const loading = useSelector((state) => state.user.loading);
    if (isUserLogged) return <Navigate to="/user/dashboard" replace />;
    return (
        <div className="login-page-overlay">
            {loading && <div className="loading"></div>}
            <form onSubmit={login} className="login-form">
                <div className="logo">
                    Black
                    <br />
                    Basket
                </div>
                <div className="login-form-header">User Login</div>

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
                            setCredentials((prev) => ({
                                ...prev,
                                email: e.target.value,
                            }));
                            setErrors((prev) => ({ ...prev, email: "" }));
                        }}
                    />
                    <span className="form-error">{errors.email}</span>
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
                            setCredentials((prev) => ({
                                ...prev,
                                password: e.target.value,
                            }));
                            setErrors((prev) => ({ ...prev, password: "" }));
                        }}
                    />
                    <span className="form-error">{errors.password}</span>
                </div>

                <button className="button-inverse-full">Login</button>

                <div className="login-form-footer">
                    Don't have an account?{" "}
                    <div className="button-container-flex">
                        <div
                            className="login-footer-button"
                            onClick={handleGuestLogin}
                        >
                            Guest Login
                        </div>
                        <NavLink
                            to="/user/signup"
                            className="login-footer-button"
                        >
                            Signup
                        </NavLink>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default UserLogin;
