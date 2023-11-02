import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { adminLogin } from "../../Redux/Thunks/adminThunks";
import Dashboard from "../User/Dashboard";
import Home from "../Home";
import { NavLink, Navigate, useNavigate } from "react-router-dom";
function AdminLogin(props) {
    const dispatch = useDispatch();
    const [credentials, setCredentials] = useState({
        email: "",
        password: "",
    });
    const errorMessage = useSelector((state) => state.admin.errorMessage);
    async function login(e) {
        e.preventDefault();
        dispatch(adminLogin(credentials));
    }
    const isAdminLogged = useSelector((state) => state.admin.isAdminLogged);
    if (isAdminLogged) return <Navigate to="/admin/dashboard" replace />;
    return (
        <div>
            <form onSubmit={(e) => login(e)} className="login-form">
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
                        onChange={(e) =>
                            setCredentials((prev) => {
                                return { ...prev, email: e.target.value };
                            })
                        }
                        required
                    />
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
                        type="text"
                        name="admin-password"
                        className="login-form-input"
                        onChange={(e) =>
                            setCredentials((prev) => {
                                return { ...prev, password: e.target.value };
                            })
                        }
                        required
                    />
                </div>
                <button className="button-1-inverse-full">Login</button>
                <div className="login-form-footer">
                    Didn't have an account?{" "}
                    <NavLink to="/user/signup">Signup</NavLink>
                </div>
            </form>
        </div>
    );
}

export default AdminLogin;
