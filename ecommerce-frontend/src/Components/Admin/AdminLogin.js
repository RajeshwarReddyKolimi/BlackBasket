import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { adminLogin } from "../../Redux/Thunks/adminThunks";
import { NavLink, Navigate } from "react-router-dom";

function AdminLogin() {
    const dispatch = useDispatch();
    const [credentials, setCredentials] = useState({
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState({
        email: "",
        password: "",
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

        dispatch(adminLogin(credentials));
    };

    const isAdminLogged = useSelector((state) => state.admin.isAdminLogged);

    if (isAdminLogged) return <Navigate to="/admin/dashboard" replace />;

    return (
        <div>
            <form onSubmit={login} className="login-form">
                <div className="login-form-header">Admin Login</div>
                <div className="login-form-item">
                    <label htmlFor="admin-email" className="login-form-label">
                        {" "}
                        Email :
                    </label>
                    <input
                        type="text"
                        name="admin-email"
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
                    <label
                        htmlFor="admin-password"
                        className="login-form-label"
                    >
                        {" "}
                        Password :
                    </label>

                    <input
                        type="password"
                        name="admin-password"
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
            </form>
        </div>
    );
}

export default AdminLogin;
