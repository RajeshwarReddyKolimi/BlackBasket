import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUserAddress } from "../../Redux/Thunks/userThunks";
import "../../styles/userAccount.css";
import { Navigate } from "react-router-dom";
import { createQuery } from "../../Redux/Thunks/enquiryThunks";

function UserCreateQuery() {
    const dispatch = useDispatch();
    const [query, setQuery] = useState({});
    function enquire(e) {
        e.preventDefault();
        dispatch(createQuery(query));
    }
    const isUserLogged = useSelector((state) => state.user.isUserLogged);
    if (!isUserLogged) return <Navigate to="/user/login" replace />;
    return (
        <div className="add-query-section">
            <div className="section-header">
                <div className="header-title">Raise a ticket</div>
                <button
                    type="submit"
                    className="button"
                    onClick={(e) => enquire(e)}
                >
                    Save
                </button>
            </div>
            <form onSubmit={(e) => enquire(e)} className="add-query-form">
                <div className="query-form-item">
                    <label for="query-user-name" className="query-form-label">
                        {" "}
                        Name :{" "}
                    </label>

                    <input
                        type="text"
                        name="query-user-name"
                        className="query-form-input"
                        onChange={(e) =>
                            setQuery((prev) => {
                                return { ...prev, name: e.target.value };
                            })
                        }
                        required
                    />
                </div>
                <div className="query-form-item">
                    <label for="query-user-email" className="query-form-label">
                        {" "}
                        Email :{" "}
                    </label>

                    <input
                        type="text"
                        name="query-user-email"
                        className="query-form-input"
                        onChange={(e) =>
                            setQuery((prev) => {
                                return { ...prev, email: e.target.value };
                            })
                        }
                        required
                    />
                </div>
                <div className="query-form-item">
                    <label for="query-user-mobile" className="query-form-label">
                        {" "}
                        Mobile :{" "}
                    </label>

                    <input
                        type="text"
                        name="query-user-mobile"
                        className="query-form-input"
                        onChange={(e) =>
                            setQuery((prev) => {
                                return { ...prev, mobile: e.target.value };
                            })
                        }
                        required
                    />
                </div>
                <div className="query-form-item">
                    <label
                        for="query-user-subject"
                        className="query-form-label"
                    >
                        {" "}
                        Subject :{" "}
                    </label>

                    <input
                        type="text"
                        name="query-user-subject"
                        className="query-form-input"
                        onChange={(e) =>
                            setQuery((prev) => {
                                return { ...prev, subject: e.target.value };
                            })
                        }
                        required
                    />
                </div>
                <div className="query-form-item">
                    <label
                        for="query-user-description"
                        className="query-form-label"
                    >
                        {" "}
                        Description :{" "}
                    </label>

                    <input
                        type="text"
                        name="query-user-description"
                        className="query-form-input"
                        onChange={(e) =>
                            setQuery((prev) => {
                                return { ...prev, description: e.target.value };
                            })
                        }
                        required
                    />
                </div>
            </form>
        </div>
    );
}

export default UserCreateQuery;
