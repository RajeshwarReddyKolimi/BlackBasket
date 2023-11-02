import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userSignup } from "../../Redux/Thunks/userThunks";
import Login from "./UserLogin";
import Dashboard from "./Dashboard";
import Home from "../Home";
import { NavLink, Navigate } from "react-router-dom";
import "../../styles/login.css";

function UserSignup(props) {
    const dispatch = useDispatch();
    const [userDetails, setUserDetails] = useState({
        password: "",
        email: "",
        firstName: "",
        lastName: "",
    });
    const errorMessage = useSelector((state) => state.user.errorMessage);
    function signup(e) {
        e.preventDefault();
        dispatch(userSignup(userDetails));
    }

    const isUserLogged = useSelector((state) => state.user.isUserLogged);

    if (isUserLogged) return <Navigate to="/user/dashboard" replace />;

    return (
        <div>
            <form onSubmit={(e) => signup(e)} className="login-form">
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
                        onChange={(e) =>
                            setUserDetails((prev) => {
                                return { ...prev, firstName: e.target.value };
                            })
                        }
                        required
                    />
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
                        onChange={(e) =>
                            setUserDetails((prev) => {
                                return { ...prev, lastName: e.target.value };
                            })
                        }
                        required
                    />
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
                        onChange={(e) =>
                            setUserDetails((prev) => {
                                return { ...prev, email: e.target.value };
                            })
                        }
                        required
                    />
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
                        onChange={(e) =>
                            setUserDetails((prev) => {
                                return { ...prev, mobile: e.target.value };
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
                            setUserDetails((prev) => {
                                return { ...prev, password: e.target.value };
                            })
                        }
                        required
                    />
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
                        type="text"
                        name="user-re-password"
                        className="login-form-input"
                    />
                </div>
                <button className="button-1-inverse-full">Signup</button>
                <div className="login-form-footer">
                    Already have an account?{" "}
                    <NavLink to="/user/login">Login</NavLink>
                </div>
            </form>
        </div>
    );
}

export default UserSignup;
