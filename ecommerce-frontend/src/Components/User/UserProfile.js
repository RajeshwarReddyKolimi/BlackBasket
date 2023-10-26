import React, { useEffect } from "react";
import "../../styles/userAccount.css";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails } from "../../Redux/Thunks/userThunks";
import { NavLink } from "react-router-dom";
import { BiSolidEditAlt } from "react-icons/bi";
function UserProfile() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getUserDetails());
    }, []);
    const userData = useSelector((state) => state.user.userData);
    return (
        <div className="profile-section">
            <div className="section-header">
                <div className="header-title">Your Profile</div>

                <NavLink to="/user/account/profile/update">
                    <button className="button">
                        <span>Edit</span>
                        <BiSolidEditAlt />
                    </button>
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
