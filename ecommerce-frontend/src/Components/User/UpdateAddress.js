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
        userName: "",
        houseNo: "",
        street: "",
        village: "",
        City: "",
        landmark: "",
        pincode: "",
        mobile: "",
    });
    const userAddresses = useSelector((state) => state.user.userData.address);
    const matchedAddress = userAddresses.filter(
        (address) => address._id.toString() === id.toString()
    );
    let currentAddress = {
        userName: "",
        houseNo: "",
        street: "",
        village: "",
        City: "",
        landmark: "",
        pincode: "",
        mobile: "",
    };
    if (matchedAddress && matchedAddress[0]) currentAddress = matchedAddress[0];

    useEffect(() => {
        dispatch(getUserDetails());
        setAddress((prev) => {
            return {
                userName: currentAddress.userName,
                houseNo: currentAddress.houseNo,
                street: currentAddress.street,
                village: currentAddress.village,
                city: currentAddress.city,
                landmark: currentAddress.landmark,
                pincode: currentAddress.pincode,
                mobile: currentAddress.mobile,
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
        <div className="section">
            <div className="section-header">
                <div className="header-title">Update Address</div>
                <div className="flex-buffer"></div>
                <button
                    type="submit"
                    className="button"
                    onClick={(e) => updateAddress(e)}
                >
                    Update
                </button>
            </div>
            <form onSubmit={(e) => updateAddress(e)} className="form">
                <div className="form-item">
                    <label for="address-userName" className="form-label">
                        {" "}
                        User Name :{" "}
                    </label>
                    <input
                        type="text"
                        name="address-userName"
                        className="form-input"
                        defaultValue={currentAddress.userName}
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
                        defaultValue={currentAddress.houseNo}
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
                        defaultValue={currentAddress.street}
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
                        defaultValue={currentAddress.village}
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
                        defaultValue={currentAddress.city}
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
                        defaultValue={currentAddress.landmark}
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
                        defaultValue={currentAddress.pincode}
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
                        defaultValue={currentAddress.mobile}
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

export default UpdateAddress;
