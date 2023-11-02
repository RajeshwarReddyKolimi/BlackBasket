import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";
import "../../styles/userAccount.css";
import {
    getUserDetails,
    updateUserAddress,
} from "../../Redux/Thunks/userThunks";
function UpdateAddress() {
    const { id } = useParams();
    const dispatch = useDispatch();

    const [address, setAddress] = useState({
        houseNo: "",
        street: "",
        village: "",
        City: "",
        landmark: "",
        pincode: "",
    });
    const userAddresses = useSelector((state) => state.user.userData.address);
    const matchedAddress = userAddresses.filter(
        (address) => address._id.toString() === id.toString()
    );
    let currentAddress = {
        houseNo: "",
        street: "",
        village: "",
        City: "",
        landmark: "",
        pincode: "",
    };
    if (matchedAddress && matchedAddress[0]) currentAddress = matchedAddress[0];

    useEffect(() => {
        dispatch(getUserDetails());
        setAddress((prev) => {
            return {
                houseNo: currentAddress.houseNo,
                street: currentAddress.street,
                village: currentAddress.village,
                city: currentAddress.city,
                landmark: currentAddress.landmark,
                pincode: currentAddress.pincode,
            };
        });
    }, []);
    function updateAddress(e) {
        e.preventDefault();
        dispatch(updateUserAddress({ id, address }));
        return <Navigate to="/user/address" replace />;
    }

    const isUserLogged = useSelector((state) => state.user.isUserLogged);

    if (!isUserLogged) return <Navigate to="/user/login" replace />;
    return (
        <div className="update-address-section">
            <div className="section-header">
                <div className="header-title">Update Address</div>
                <button
                    type="submit"
                    className="button-1"
                    onClick={(e) => updateAddress(e)}
                >
                    Update
                </button>
            </div>
            <form
                onSubmit={(e) => updateAddress(e)}
                className="update-address-form"
            >
                <div className="address-form-item">
                    <label for="address-house" className="address-form-label">
                        {" "}
                        House no. :{" "}
                    </label>

                    <input
                        type="text"
                        name="address-house"
                        className="address-form-input"
                        defaultValue={currentAddress.houseNo}
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
                        defaultValue={currentAddress.street}
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
                        defaultValue={currentAddress.village}
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
                        defaultValue={currentAddress.city}
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
                        defaultValue={currentAddress.landmark}
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
                        defaultValue={currentAddress.pincode}
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

export default UpdateAddress;
