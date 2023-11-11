import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../../Redux/Thunks/userThunks";
import Dashboard from "./Dashboard";
import Home from "../Home";
import { NavLink, Navigate, useNavigate } from "react-router-dom";
import ResultPopup from "../ResultPopup";
function UserLogin(props) {
    const dispatch = useDispatch();
    const [credentials, setCredentials] = useState({
        email: "",
        password: "",
    });
    const errorMessage = useSelector((state) => state.user.errorMessage);
    const successMessage = useSelector((state) => state.user.successMessage);
    async function login(e) {
        e.preventDefault();
        dispatch(userLogin(credentials));
    }
    const isUserLogged = useSelector((state) => state.user.isUserLogged);
    const isAdminLogged = useSelector((state) => state.user.isAdminLogged);
    if (isUserLogged) return <Navigate to="/user/dashboard" replace />;
    else if (isAdminLogged) return <Navigate to="/admin/dashboard" replace />;
    return (
        <div>
            <ResultPopup
                successMessage={successMessage}
                errorMessage={errorMessage}
            />

            <form onSubmit={(e) => login(e)} className="login-form">
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
                        onChange={(e) =>
                            setCredentials((prev) => {
                                return { ...prev, email: e.target.value };
                            })
                        }
                        required
                    />
                </div>

                <div className="login-form-item">
                    <label htmlFor="user-password" className="login-form-label">
                        {" "}
                        Password :
                    </label>

                    <input
                        type="text"
                        name="user-password"
                        className="login-form-input"
                        onChange={(e) =>
                            setCredentials((prev) => {
                                return { ...prev, password: e.target.value };
                            })
                        }
                        required
                    />
                </div>
                <button className="button-inverse-full">Login</button>
                <div className="login-form-footer">
                    Didn't have an account?{" "}
                    <NavLink to="/user/signup">Signup</NavLink>
                </div>
            </form>
        </div>
    );
}

export default UserLogin;
