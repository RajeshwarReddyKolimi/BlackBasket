import React from "react";
import "../../styles/userAccount.css";
import { NavLink } from "react-router-dom";
function UserAccount() {
    return (
        <div className="user-account">
            <div className="header-title">Your Account</div>
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
                <NavLink to="#" className={"account-options-items"}>
                    <div className="account-option-header">Support</div>
                    <div>Mail your Query</div>
                </NavLink>
            </div>
        </div>
    );
}

export default UserAccount;
