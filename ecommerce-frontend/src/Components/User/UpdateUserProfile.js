import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    getUserDetails,
    updateUserDetails,
} from "../../Redux/Thunks/userThunks";

function UpdateUserProfile() {
    const dispatch = useDispatch();
    const [details, setDetails] = useState({
        firstName: "",
        lastName: "",
        email: "",
        mobile: "",
    });
    useEffect(() => {
        dispatch(getUserDetails());
        setDetails((prev) => {
            return {
                firstName: userData.firstName,
                lastName: userData.lastName,
                email: userData.email,
                mobile: userData.mobile,
            };
        });
    }, []);
    const userData = useSelector((state) => state.user.userData);
    function handleUpdateDetails(e) {
        e.preventDefault();
        dispatch(updateUserDetails(details));
    }

    return (
        <div className="profile-update">
            <div className="section-header">
                <div className="header-title">Edit Details</div>

                <button
                    type="submit"
                    className="button"
                    onClick={(e) => handleUpdateDetails(e)}
                >
                    Save
                </button>
            </div>
            <form
                className="update-form"
                onSubmit={(e) => handleUpdateDetails(e)}
            >
                <div className="update-form-item">
                    <label for="firstName" className="update-form-label">
                        {" "}
                        First Name :{" "}
                    </label>
                    <input
                        type="text"
                        name="firstName"
                        className="update-form-input"
                        defaultValue={userData.firstName}
                        onChange={(e) =>
                            setDetails((prev) => {
                                return { ...prev, firstName: e.target.value };
                            })
                        }
                    />
                </div>
                <div className="update-form-item">
                    <label for="lastName" className="update-form-label">
                        {" "}
                        Last Name :{" "}
                    </label>

                    <input
                        type="text"
                        name="lastName"
                        className="update-form-input"
                        defaultValue={userData.lastName}
                        onChange={(e) =>
                            setDetails((prev) => {
                                return { ...prev, lastName: e.target.value };
                            })
                        }
                    />
                </div>
                <div className="update-form-item">
                    <label for="email" className="update-form-label">
                        Email :
                    </label>
                    <input
                        type="text"
                        name="email"
                        className="update-form-input"
                        defaultValue={userData.email}
                        onChange={(e) =>
                            setDetails((prev) => {
                                return { ...prev, email: e.target.value };
                            })
                        }
                    />
                </div>
                <div className="update-form-item">
                    <label for="mobile" className="update-form-label">
                        Mobile no. :
                    </label>
                    <input
                        type="text"
                        name="mobile"
                        className="update-form-input"
                        defaultValue={userData.mobile}
                        onChange={(e) =>
                            setDetails((prev) => {
                                return { ...prev, mobile: e.target.value };
                            })
                        }
                    />
                </div>
            </form>
        </div>
    );
}

export default UpdateUserProfile;
