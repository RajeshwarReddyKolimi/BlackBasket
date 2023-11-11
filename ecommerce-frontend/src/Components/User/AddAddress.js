import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUserAddress } from "../../Redux/Thunks/userThunks";
import "../../styles/forms.css";
import { Navigate } from "react-router-dom";
function AddAddress() {
    const dispatch = useDispatch();
    const [address, setAddress] = useState({
        userName: "",
        houseNo: "",
        street: "",
        village: "",
        City: "",
        landmark: "",
        pincode: "",
        mobile: "",
    });
    function addAddress(e) {
        e.preventDefault();
        dispatch(addUserAddress(address));
    }
    const isUserLogged = useSelector((state) => state.user.isUserLogged);

    if (!isUserLogged) return <Navigate to="/user/login" replace />;
    return (
        <div className="section">
            <div className="section-header">
                <div className="header-title">Add Address</div>
                <div className="flex-buffer"></div>
                <button
                    type="submit"
                    className="button"
                    onClick={(e) => addAddress(e)}
                >
                    Add
                </button>
            </div>
            <form onSubmit={(e) => addAddress(e)} className="form">
                <div className="form-item">
                    <label for="address-userName" className="form-label">
                        {" "}
                        UserName :{" "}
                    </label>

                    <input
                        type="text"
                        name="address-userName"
                        className="form-input"
                        onChange={(e) =>
                            setAddress((prev) => {
                                return { ...prev, userName: e.target.value };
                            })
                        }
                    />
                </div>
                <div className="form-item">
                    <label for="address-house" className="form-label">
                        {" "}
                        House no. :{" "}
                    </label>

                    <input
                        type="text"
                        name="address-house"
                        className="form-input"
                        onChange={(e) =>
                            setAddress((prev) => {
                                return { ...prev, houseNo: e.target.value };
                            })
                        }
                    />
                </div>
                <div className="form-item">
                    <label for="address-street" className="form-label">
                        {" "}
                        Street :{" "}
                    </label>

                    <input
                        type="text"
                        name="address-street"
                        className="form-input"
                        onChange={(e) =>
                            setAddress((prev) => {
                                return { ...prev, street: e.target.value };
                            })
                        }
                    />
                </div>
                <div className="form-item">
                    <label for="address-village" className="form-label">
                        {" "}
                        Village :{" "}
                    </label>

                    <input
                        type="text"
                        name="address-village"
                        className="form-input"
                        onChange={(e) =>
                            setAddress((prev) => {
                                return { ...prev, village: e.target.value };
                            })
                        }
                    />
                </div>
                <div className="form-item">
                    <label for="address-city" className="form-label">
                        {" "}
                        City :{" "}
                    </label>

                    <input
                        type="text"
                        name="address-city"
                        className="form-input"
                        onChange={(e) =>
                            setAddress((prev) => {
                                return { ...prev, city: e.target.value };
                            })
                        }
                    />
                </div>
                <div className="form-item">
                    <label for="address-landmark" className="form-label">
                        {" "}
                        Landmark :{" "}
                    </label>

                    <input
                        type="text"
                        name="address-landmark"
                        className="form-input"
                        onChange={(e) =>
                            setAddress((prev) => {
                                return { ...prev, landmark: e.target.value };
                            })
                        }
                    />
                </div>
                <div className="form-item">
                    <label for="address-pincode" className="form-label">
                        {" "}
                        Pincode :{" "}
                    </label>

                    <input
                        type="text"
                        name="address-pincode"
                        className="form-input"
                        onChange={(e) =>
                            setAddress((prev) => {
                                return { ...prev, pincode: e.target.value };
                            })
                        }
                    />
                </div>
                <div className="form-item">
                    <label for="address-mobile" className="form-label">
                        {" "}
                        Mobile no. :{" "}
                    </label>

                    <input
                        type="text"
                        name="address-mobile"
                        className="form-input"
                        onChange={(e) =>
                            setAddress((prev) => {
                                return { ...prev, mobile: e.target.value };
                            })
                        }
                    />
                </div>
            </form>
        </div>
    );
}

export default AddAddress;
