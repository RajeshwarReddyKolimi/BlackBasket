import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
    blockUser,
    deleteUser,
    unblockUser,
} from "../../Redux/Thunks/adminThunks";
import "../../styles/adminUser.css";
import { NavLink } from "react-router-dom";
import ConfirmPopup from "../ConfirmPopup";
function AdminUserCard(props) {
    const { user } = props;
    const [showConfirmPopup, setShowConfirmPopup] = useState(false);
    const dispatch = useDispatch();
    function block() {
        dispatch(blockUser(user._id));
    }
    function unblock() {
        dispatch(unblockUser(user._id));
    }
    function delUser() {
        dispatch(deleteUser(user._id));
    }
    return (
        <div className="admin-user-card">
            <div className="user-info-container">
                <div className="user-info-item">
                    <div className="user-info-key">Name : </div>
                    <div className="user-info-value">
                        {user.firstName} {user.lastName}
                    </div>
                </div>
                <div className="user-info-item">
                    <div className="user-info-key">Email : </div>
                    <div>{user.email}</div>
                </div>
                <div className="user-info-item">
                    <div className="user-info-key">Mobile no. : </div>
                    <div>{user.mobile}</div>
                </div>
            </div>
            <div className="button-container">
                <NavLink to="/admin/user/orders" className="button-full">
                    Orders
                </NavLink>
                {user.isBlocked ? (
                    <button onClick={unblock} className="button-full">
                        Unblock
                    </button>
                ) : (
                    <button onClick={block} className="button-full">
                        Block
                    </button>
                )}
                <button
                    onClick={() => setShowConfirmPopup(true)}
                    className="button-danger-full"
                >
                    Delete
                </button>
                {showConfirmPopup && (
                    <ConfirmPopup
                        action={delUser}
                        text="Are you sure you want to delete User?"
                        setShowConfirmPopup={setShowConfirmPopup}
                    />
                )}
            </div>
        </div>
    );
}

export default AdminUserCard;
