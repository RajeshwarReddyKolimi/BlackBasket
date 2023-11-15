import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails } from "../../Redux/Thunks/userThunks";
import { NavLink, Navigate } from "react-router-dom";
import UserAddressCard from "./UserAddressCard";
import Empty from "../Empty";

function UserAddress() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getUserDetails());
    }, []);
    const userAddress = useSelector((state) => state.user.userData.address);

    const isUserLogged = useSelector((state) => state.user.isUserLogged);

    if (!isUserLogged) return <Navigate to="/user/login" replace />;
    return (
        <div className="section">
            <div className="section-header">
                <div className="header-title">Your Addresses</div>
                <NavLink to="/user/address/add">
                    <button className="button">Add Address</button>
                </NavLink>
            </div>
            <div className="address-container">
                {userAddress && userAddress.length > 0 ? (
                    userAddress.map((address, key) => (
                        <UserAddressCard key={key} address={address} />
                    ))
                ) : (
                    <Empty text="No Saved Addresses" />
                )}
            </div>
        </div>
    );
}

export default UserAddress;
