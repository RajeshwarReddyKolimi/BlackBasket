import React, { useEffect, useState } from "react";
import "../../styles/userAccount.css";
import { NavLink, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RiLogoutBoxLine } from "react-icons/ri";
import {
    deleteAccount,
    getUserDetails,
    userLogout,
} from "../../Redux/Thunks/userThunks";
import ConfirmPopup from "../ConfirmPopup";
function UserAccount() {
    const dispatch = useDispatch();
    const [showConfirmPopup, setShowConfirmPopup] = useState(false);
    const isUserLogged = useSelector((state) => state.user.isUserLogged);
    useEffect(() => {
        dispatch(getUserDetails());
    }, [dispatch]);
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
                <NavLink to="/user/orders" className={"account-options-items"}>
                    <div className="account-option-header">Orders</div>
                    <div>View, Track all your Orders</div>
                </NavLink>
                <NavLink to="/user/address" className={"account-options-items"}>
                    <div className="account-option-header">Address</div>
                    <div>View, add, delete, update your addresses</div>
                </NavLink>
                <NavLink to="/user/coupons" className={"account-options-items"}>
                    <div className="account-option-header">Coupons</div>
                    <div>View Coupons</div>
                </NavLink>
                <NavLink to="/user/support" className={"account-options-items"}>
                    <div className="account-option-header">Support</div>
                    <div>View Tickets</div>
                </NavLink>
            </div>
            <div className="button-container-flex">
                <button className="button" onClick={logout}>
                    <span>Logout</span>
                    <RiLogoutBoxLine />
                </button>
                <button
                    onClick={() => setShowConfirmPopup(true)}
                    className="button-danger"
                >
                    Delete Account
                </button>
                {showConfirmPopup && (
                    <ConfirmPopup
                        action={deleteAcc}
                        text="Are you sure you want to delete account?"
                        setShowConfirmPopup={setShowConfirmPopup}
                    />
                )}
            </div>
        </div>
    );
}

export default UserAccount;
