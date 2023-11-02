import React from "react";
import { BiSolidEditAlt } from "react-icons/bi";
import { NavLink, Navigate } from "react-router-dom";
import "../../styles/userAccount.css";
import { useSelector } from "react-redux";
function UserAddressCard(props) {
    const isUserLogged = useSelector((state) => state.user.isUserLogged);

    if (!isUserLogged) return <Navigate to="/user/login" replace />;
    const { address } = props;
    return (
        <div className="user-address-card-section">
            <div className="section-header">
                <div className="header-title">Address</div>
                <NavLink to={`/user/address/update/${address._id}`}>
                    <button className="button-1">
                        <span>Edit</span>
                        <BiSolidEditAlt />
                    </button>
                </NavLink>
            </div>
            <div className="address-container">
                <div className="address-item">
                    <span className="address-item-key">House no. :</span>
                    <span className="address-item-value">
                        {address.houseNo}
                    </span>
                </div>
                <div className="address-item">
                    <span className="address-item-key">Street :</span>
                    <span className="address-item-value">{address.street}</span>
                </div>
                <div className="address-item">
                    <span className="address-item-key">Village :</span>
                    <span className="address-item-value">
                        {address.village}
                    </span>
                </div>
                <div className="address-item">
                    <span className="address-item-key">City :</span>
                    <span className="address-item-value">{address.city}</span>
                </div>
                <div className="address-item">
                    <span className="address-item-key">Landmark :</span>
                    <span className="address-item-value">
                        {address.landmark}
                    </span>
                </div>
                <div className="address-item">
                    <span className="address-item-key">Pincode :</span>
                    <span className="address-item-value">
                        {address.pincode}
                    </span>
                </div>
            </div>
        </div>
    );
}

export default UserAddressCard;
