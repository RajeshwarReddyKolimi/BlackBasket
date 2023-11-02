import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails } from "../../Redux/Thunks/userThunks";
import { NavLink, Navigate } from "react-router-dom";
import UserAddressCard from "./UserAddressCard";

function UserAddress() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getUserDetails());
    }, []);
    const userAddress = useSelector((state) => state.user.userData.address);

    const isUserLogged = useSelector((state) => state.user.isUserLogged);

    if (!isUserLogged) return <Navigate to="/user/login" replace />;
    return (
        <div className="user-address-section">
            <div className="section-header">
                <div className="header-title">Your Addresses</div>
                <NavLink to="/user/address/add">
                    <button className="button-1">Add Address</button>
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
