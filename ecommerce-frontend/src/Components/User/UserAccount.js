import React, { useEffect } from "react";
import "../../styles/userAccount.css";
import { NavLink, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RiLogoutBoxLine } from "react-icons/ri";
import {
    deleteAccount,
    getUserDetails,
    userLogout,
} from "../../Redux/Thunks/userThunks";
import ResultPopup from "../ResultPopup";
function UserAccount() {
    const dispatch = useDispatch();
    const isUserLogged = useSelector((state) => state.user.isUserLogged);
    useEffect(() => {
        dispatch(getUserDetails());
    }, []);
    if (!isUserLogged) return <Navigate to="/user/login" replace />;
    function logout() {
        dispatch(userLogout());
    }
    function deleteAcc() {
        dispatch(deleteAccount());
    }
    return (
        <div className="section">
            <div className="section-header">
                <div className="header-title">My Account</div>
            </div>
            <div className="account-options">
                <NavLink
                    to="/user/account/profile"
                    className={"account-options-items"}
                >
                    <div className="account-option-header">Profile</div>
                    <div>Edit Name, Email, Mobile</div>
                </NavLink>
                <NavLink to="#" className={"account-options-items"}>
                    <div className="account-option-header">
                        Login and Security
                    </div>
                    <div>Edit Password, Security Options</div>
                </NavLink>
                <NavLink to="/user/orders" className={"account-options-items"}>
                    <div className="account-option-header">Your Orders</div>
                    <div>View, Track all your Orders</div>
                </NavLink>
                <NavLink to="/user/address" className={"account-options-items"}>
                    <div className="account-option-header">Your Addresses</div>
                    <div>Add, delete, update your addresses</div>
                </NavLink>
                <NavLink to="/user/coupons" className={"account-options-items"}>
                    <div className="account-option-header">Coupons</div>
                    <div>View Coupons</div>
                </NavLink>
                <NavLink to="/user/support" className={"account-options-items"}>
                    <div className="account-option-header">Support</div>
                    <div>Mail your Query</div>
                </NavLink>
            </div>
            <div className="button-container-flex">
                <button className="button" onClick={logout}>
                    <span>Logout</span>
                    <RiLogoutBoxLine />
                </button>
                <button onClick={deleteAcc} className="button-danger">
                    Delete Account
                </button>
            </div>
        </div>
    );
}

export default UserAccount;
