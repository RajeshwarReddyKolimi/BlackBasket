import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails } from "../../Redux/Thunks/userThunks";
import { NavLink } from "react-router-dom";
import UserAddressCard from "./UserAddressCard";

function UserAddress() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getUserDetails());
    }, []);
    const userAddress = useSelector((state) => state.user.userData.address);
    return (
        <div className="user-address-section">
            <div className="section-header">
                <div className="header-title">Your Addresses</div>
                <NavLink to="/user/address/add">
                    <button className="button">Add Address</button>
                </NavLink>
            </div>
            {userAddress &&
                userAddress.map((address, key) => (
                    <UserAddressCard address={address} />
                ))}
        </div>
    );
}

export default UserAddress;
