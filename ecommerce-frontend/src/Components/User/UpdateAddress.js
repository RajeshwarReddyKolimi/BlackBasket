import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import "../../styles/userAccount.css";
import {
    getUserDetails,
    updateUserAddress,
} from "../../Redux/Thunks/userThunks";
function UpdateAddress() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

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
        city: "",
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
    const [errors, setErrors] = useState({
        userName: "",
        houseNo: "",
        city: "",
        pincode: "",
        mobile: "",
    });

    const validatePincode = (pincode) => {
        const pincodePattern = /^\d{6}$/;
        return pincodePattern.test(pincode);
    };

    const validateMobile = (mobile) => {
        const mobilePattern = /^\d{10}$/;
        return mobilePattern.test(mobile);
    };
    function updateAddress(e) {
        e.preventDefault();
        if (address.userName.trim() === "") {
            setErrors((prev) => ({ ...prev, userName: "required" }));
            return;
        }
        if (address.houseNo.trim() === "") {
            setErrors((prev) => ({ ...prev, houseNo: "required" }));
            return;
        }
        if (address.city.trim() === "") {
            setErrors((prev) => ({ ...prev, city: "required" }));
            return;
        }
        if (address.pincode.trim() === "") {
            setErrors((prev) => ({ ...prev, pincode: "required" }));
            return;
        }
        if (address.mobile.trim() === "") {
            setErrors((prev) => ({ ...prev, mobile: "required" }));
            return;
        }
        if (!validatePincode(address.pincode)) {
            setErrors((prev) => ({ ...prev, pincode: "Invalid pincode" }));
            return;
        }
        if (!validateMobile(address.mobile)) {
            setErrors((prev) => ({ ...prev, mobile: "Invalid mobile number" }));
            return;
        }
        setErrors({
            email: "",
            password: "",
        });

        dispatch(updateUserAddress({ id, address }));
        navigate(-1);
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
                    <label
                        for="address-userName"
                        className="form-label form-required"
                    >
                        {" "}
                        User Name :{" "}
                    </label>
                    <input
                        type="text"
                        name="address-userName"
                        className="form-input form-required"
                        defaultValue={currentAddress.userName}
                        onChange={(e) => {
                            setAddress((prev) => {
                                return { ...prev, userName: e.target.value };
                            });
                            setErrors((prev) => ({ ...prev, userName: "" }));
                        }}
                    />

                    <span className="form-error">{errors.userName}</span>
                </div>
                <div className="form-item">
                    <label
                        for="address-house"
                        className="form-label form-required"
                    >
                        {" "}
                        House no. :{" "}
                    </label>
                    <input
                        type="text"
                        name="address-house"
                        className="form-input"
                        defaultValue={currentAddress.houseNo}
                        onChange={(e) => {
                            setAddress((prev) => {
                                return { ...prev, houseNo: e.target.value };
                            });
                            setErrors((prev) => ({ ...prev, houseNo: "" }));
                        }}
                    />

                    <span className="form-error">{errors.houseNo}</span>
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
                    <label
                        for="address-city"
                        className="form-label form-required"
                    >
                        {" "}
                        City :{" "}
                    </label>

                    <input
                        type="text"
                        name="address-city"
                        className="form-input"
                        defaultValue={currentAddress.city}
                        onChange={(e) => {
                            setAddress((prev) => {
                                return { ...prev, city: e.target.value };
                            });

                            setErrors((prev) => ({ ...prev, city: "" }));
                        }}
                    />

                    <span className="form-error">{errors.city}</span>
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
                    <label
                        for="address-pincode"
                        className="form-label form-required"
                    >
                        {" "}
                        Pincode :{" "}
                    </label>

                    <input
                        type="text"
                        name="address-pincode"
                        className="form-input"
                        defaultValue={currentAddress.pincode}
                        onChange={(e) => {
                            setAddress((prev) => {
                                return { ...prev, pincode: e.target.value };
                            });

                            setErrors((prev) => ({ ...prev, pincode: "" }));
                        }}
                    />

                    <span className="form-error">{errors.pincode}</span>
                </div>
                <div className="form-item">
                    <label
                        for="address-mobile"
                        className="form-label form-required"
                    >
                        {" "}
                        Mobile no. :{" "}
                    </label>
                    <input
                        type="text"
                        name="address-mobile"
                        className="form-input form-required form-required"
                        defaultValue={currentAddress.mobile}
                        onChange={(e) => {
                            setAddress((prev) => {
                                return { ...prev, mobile: e.target.value };
                            });

                            setErrors((prev) => ({ ...prev, mobile: "" }));
                        }}
                    />

                    <span className="form-error">{errors.mobile}</span>
                </div>
            </form>
        </div>
    );
}

export default UpdateAddress;
