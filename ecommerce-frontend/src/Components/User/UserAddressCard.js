import React, { useState } from "react";
import { NavLink, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "../../styles/address.css";
import ConfirmPopup from "../ConfirmPopup";
import { deleteAddress } from "../../Redux/Thunks/userThunks";
function UserAddressCard(props) {
    const [showConfirmPopup, setShowConfirmPopup] = useState(false);
    const dispatch = useDispatch();
    const isUserLogged = useSelector((state) => state.user.isUserLogged);
    if (!isUserLogged) return <Navigate to="/user/login" replace />;
    const { address } = props;
    const formattedAddress = `${
        address.userName ? address.userName + "\n" : ""
    }${address.houseNo ? address.houseNo + "\n" : ""}${
        address.street ? address.street + "\n" : ""
    }${address.village ? address.village + "\n" : ""}${
        address.city ? address.city + "\n" : ""
    }${address.landmark ? address.landmark + "\n" : ""}${
        address.pincode ? address.pincode + "\n" : ""
    }${address.mobile}`;
    async function dltAddress() {
        dispatch(deleteAddress({ id: address._id }));
    }
    return (
        <div className="address-item">
            <div className="address">{formattedAddress}</div>
            <div className="flex-buffer"></div>
            <div className="button-container">
                <NavLink
                    className="button"
                    to={`/user/address/update/${address._id}`}
                >
                    Edit
                </NavLink>
                <button
                    className="button-danger"
                    onClick={() => setShowConfirmPopup(true)}
                >
                    Delete{" "}
                </button>
                {showConfirmPopup && (
                    <ConfirmPopup
                        action={dltAddress}
                        text="Are you sure you want to delete this Address?"
                        setShowConfirmPopup={setShowConfirmPopup}
                    />
                )}
            </div>
        </div>
    );
}

export default UserAddressCard;
