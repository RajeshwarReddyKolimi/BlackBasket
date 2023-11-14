import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUserAddress } from "../../Redux/Thunks/userThunks";
import "../../styles/userAccount.css";
import { Navigate, useNavigate } from "react-router-dom";
import { createQuery } from "../../Redux/Thunks/enquiryThunks";
import "../../styles/forms.css";
function UserCreateQuery() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [query, setQuery] = useState({});
    function enquire(e) {
        e.preventDefault();
        dispatch(createQuery(query));
        navigate(-1);
    }
    const isUserLogged = useSelector((state) => state.user.isUserLogged);
    if (!isUserLogged) return <Navigate to="/user/login" replace />;
    return (
        <div className="section">
            <div className="section-header">
                <div className="header-title">Raise a ticket</div>
                <button
                    type="submit"
                    className="button"
                    onClick={(e) => enquire(e)}
                >
                    Submit
                </button>
            </div>
            <form onSubmit={(e) => enquire(e)} className="form">
                <div className="form-item">
                    <label for="query-user-name" className="form-label">
                        {" "}
                        Name :{" "}
                    </label>

                    <input
                        type="text"
                        name="query-user-name"
                        className="form-input"
                        onChange={(e) =>
                            setQuery((prev) => {
                                return { ...prev, name: e.target.value };
                            })
                        }
                        required
                    />
                </div>
                <div className="form-item">
                    <label for="query-user-email" className="form-label">
                        {" "}
                        Email :{" "}
                    </label>

                    <input
                        type="text"
                        name="query-user-email"
                        className="form-input"
                        onChange={(e) =>
                            setQuery((prev) => {
                                return { ...prev, email: e.target.value };
                            })
                        }
                        required
                    />
                </div>
                <div className="form-item">
                    <label for="query-user-mobile" className="form-label">
                        {" "}
                        Mobile :{" "}
                    </label>

                    <input
                        type="text"
                        name="query-user-mobile"
                        className="form-input"
                        onChange={(e) =>
                            setQuery((prev) => {
                                return { ...prev, mobile: e.target.value };
                            })
                        }
                        required
                    />
                </div>
                <div className="form-item">
                    <label for="query-user-subject" className="form-label">
                        {" "}
                        Subject :{" "}
                    </label>

                    <input
                        type="text"
                        name="query-user-subject"
                        className="form-input"
                        onChange={(e) =>
                            setQuery((prev) => {
                                return { ...prev, subject: e.target.value };
                            })
                        }
                        required
                    />
                </div>
                <div className="form-item">
                    <label for="query-user-description" className="form-label">
                        {" "}
                        Description :{" "}
                    </label>

                    <input
                        type="text"
                        name="query-user-description"
                        className="form-input"
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
