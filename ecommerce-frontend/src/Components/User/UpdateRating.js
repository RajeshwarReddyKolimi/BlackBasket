import React, { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { getUserDetails, updateRating } from "../../Redux/Thunks/userThunks";
import { useDispatch, useSelector } from "react-redux";

import axios from "axios";
import "../../styles/forms.css";
import apiUrl from "../../apiUrl";

function UpdateRating() {
    const navigate = useNavigate();
    const [userStar, setUserStar] = useState();
    const [userComment, setUserComment] = useState("");
    const { id } = useParams();
    const dispatch = useDispatch();
    let isUserLogged = false;
    isUserLogged = useSelector((state) => state.user.isUserLogged);
    useEffect(() => {
        dispatch(getUserDetails());
    }, [dispatch]);
    useEffect(() => {
        if (isUserLogged) getRating();
    }, []);
    if (!isUserLogged) return <Navigate to="/user/login" replace />;
    async function getRating() {
        try {
            const response = await axios.get(`${apiUrl}/product/rating/${id}`, {
                withCredentials: true,
            });
            setUserStar(response.data.star);
            setUserComment(response.data.comment);
            return <Navigate to="/user/orders" replace />;
        } catch (error) {}
    }
    async function handleUpdateRating(e) {
        e.preventDefault();
        dispatch(updateRating({ id, userStar, userComment }));
        navigate(-1);
    }
    return (
        <div className="section">
            <div className="section-header">
                <div className="header-title">Edit Rating</div>
                <button
                    type="submit"
                    className="button"
                    onClick={(e) => handleUpdateRating(e)}
                >
                    Submit
                </button>
            </div>
            <form className="form" onSubmit={(e) => handleUpdateRating(e)}>
                <div className="form-item">
                    <label
                        htmlFor="user-rating"
                        className="form-label form-required"
                    >
                        Rating
                    </label>
                    <input
                        type="number"
                        min="1"
                        max="5"
                        step="1"
                        name="user-rating"
                        className="form-input"
                        onChange={(e) => setUserStar(e.target.value)}
                        value={userStar}
                        required
                    />
                </div>
                <div className="form-item">
                    <label htmlFor="user-review" className="form-label">
                        Review
                    </label>
                    <input
                        defaultValue={userComment}
                        type="text"
                        className="form-input"
                        name="user-review"
                        onChange={(e) => setUserComment(e.target.value)}
                    />
                </div>
            </form>
        </div>
    );
}

export default UpdateRating;
