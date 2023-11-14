import React, { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { getUserDetails } from "../../Redux/Thunks/userThunks";
import { useDispatch, useSelector } from "react-redux";
import findToken from "../../findToken";
import axios from "axios";
import "../../styles/forms.css";
import apiUrl from "../../apiUrl";

function UpdateRating() {
    const navigate = useNavigate();
    const [currentRating, setCurrentRating] = useState({
        star: 0,
        comment: "",
        productId: "",
        _id: "",
    });
    const [userStar, setUserStar] = useState();
    const [userComment, setUserComment] = useState("");
    const { id } = useParams();
    const dispatch = useDispatch();
    let isUserLogged = false;
    isUserLogged = useSelector((state) => state.user.isUserLogged);
    useEffect(() => {
        dispatch(getUserDetails());
    }, []);
    useEffect(() => {
        if (isUserLogged) getRating();
    }, []);
    if (!isUserLogged) return <Navigate to="/user/login" replace />;
    async function getRating() {
        const token = await findToken();
        try {
            const response = await axios.get(`${apiUrl}/product/rating/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            setCurrentRating(response.data[0]);
            return <Navigate to="/user/orders" replace />;
        } catch (error) {
            console.error("Fetch error:", error);
        }
    }
    async function handleUpdateRating(e) {
        e.preventDefault();
        const token = await findToken();
        try {
            const response = await axios.put(
                `${apiUrl}/product/rating`,
                {
                    star: userStar,
                    productId: id,
                    comment: userComment,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            navigate(-1);
        } catch (error) {
            console.error("Fetch error:", error);
        }
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
                        defaultValue={currentRating && currentRating.star}
                        type="number"
                        min="1"
                        max="5"
                        step="1"
                        name="user-rating"
                        className="form-input "
                        onChange={(e) => setUserStar(e.target.value)}
                        required
                    />
                </div>
                <div className="form-item">
                    <label htmlFor="user-review" className="form-label">
                        Review
                    </label>
                    <input
                        defaultValue={currentRating && currentRating.comment}
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
