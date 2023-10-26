import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUserAddress } from "../../Redux/Thunks/userThunks";
import "../../styles/userAccount.css";
function AddAddress() {
    const dispatch = useDispatch();
    const [address, setAddress] = useState({
        houseNo: "",
        street: "",
        village: "",
        City: "",
        landmark: "",
        pincode: "",
    });
    function addAddress(e) {
        e.preventDefault();
        dispatch(addUserAddress(address));
    }
    return (
        <div className="add-address-section">
            <div className="section-header">
                <div className="header-title">Add Address</div>
                <button
                    type="submit"
                    className="button"
                    onClick={(e) => addAddress(e)}
                >
                    Add
                </button>
            </div>
            <form onSubmit={(e) => addAddress(e)} className="add-address-form">
                <div className="address-form-item">
                    <label for="address-house" className="address-form-label">
                        {" "}
                        House no. :{" "}
                    </label>

                    <input
                        type="text"
                        name="address-house"
                        className="address-form-input"
                        onChange={(e) =>
                            setAddress((prev) => {
                                return { ...prev, houseNo: e.target.value };
                            })
                        }
                    />
                </div>
                <div className="address-form-item">
                    <label for="address-street" className="address-form-label">
                        {" "}
                        Street :{" "}
                    </label>

                    <input
                        type="text"
                        name="address-street"
                        className="address-form-input"
                        onChange={(e) =>
                            setAddress((prev) => {
                                return { ...prev, street: e.target.value };
                            })
                        }
                    />
                </div>
                <div className="address-form-item">
                    <label for="address-village" className="address-form-label">
                        {" "}
                        Village :{" "}
                    </label>

                    <input
                        type="text"
                        name="address-village"
                        className="address-form-input"
                        onChange={(e) =>
                            setAddress((prev) => {
                                return { ...prev, village: e.target.value };
                            })
                        }
                    />
                </div>
                <div className="address-form-item">
                    <label for="address-city" className="address-form-label">
                        {" "}
                        City :{" "}
                    </label>

                    <input
                        type="text"
                        name="address-city"
                        className="address-form-input"
                        onChange={(e) =>
                            setAddress((prev) => {
                                return { ...prev, city: e.target.value };
                            })
                        }
                    />
                </div>
                <div className="address-form-item">
                    <label
                        for="address-landmark"
                        className="address-form-label"
                    >
                        {" "}
                        Landmark :{" "}
                    </label>

                    <input
                        type="text"
                        name="address-landmark"
                        className="address-form-input"
                        onChange={(e) =>
                            setAddress((prev) => {
                                return { ...prev, landmark: e.target.value };
                            })
                        }
                    />
                </div>
                <div className="address-form-item">
                    <label for="address-pincode" className="address-form-label">
                        {" "}
                        Pincode :{" "}
                    </label>

                    <input
                        type="text"
                        name="address-pincode"
                        className="address-form-input"
                        onChange={(e) =>
                            setAddress((prev) => {
                                return { ...prev, pincode: e.target.value };
                            })
                        }
                    />
                </div>
            </form>
        </div>
    );
}

export default AddAddress;
