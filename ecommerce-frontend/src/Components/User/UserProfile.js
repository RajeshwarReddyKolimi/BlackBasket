import React, { useEffect } from "react";
import "../../styles/userAccount.css";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails } from "../../Redux/Thunks/userThunks";
import { NavLink, Navigate } from "react-router-dom";
import { BiSolidEditAlt } from "react-icons/bi";
function UserProfile() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getUserDetails());
    }, [dispatch]);
    const userData = useSelector((state) => state.user.userData);
    const isUserLogged = useSelector((state) => state.user.isUserLogged);

    if (!isUserLogged) return <Navigate to="/user/login" replace />;
    return (
        <div className="section profile-page">
            <div className="section-header">
                <div className="header-title">My Profile</div>

                <NavLink to="/user/account/profile/update" className="button">
                    <span>Edit</span>
                    <BiSolidEditAlt />
                </NavLink>
            </div>
            <div className="profile-container">
                <div className="profile-item">
                    <span className="profile-item-key">First Name :</span>
                    <span className="profile-item-value">
                        {userData.firstName}
                    </span>
                </div>
                <div className="profile-item">
                    <span className="profile-item-key">Last Name :</span>
                    <span className="profile-item-value">
                        {userData.lastName}
                    </span>
                </div>
                <div className="profile-item">
                    <span className="profile-item-key">Email : </span>
                    <span className="profile-item-value">{userData.email}</span>
                </div>
                <div className="profile-item">
                    <span className="profile-item-key">Mobile No. : </span>
                    <span className="profile-item-value">
                        {userData.mobile}
                    </span>
                </div>
            </div>
        </div>
    );
}

export default UserProfile;
