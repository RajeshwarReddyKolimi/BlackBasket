import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { userSignup } from "../../Redux/Thunks/userThunks";
import Login from "./UserLogin";
import Dashboard from "./Dashboard";
import Home from "../Home";
import { Navigate } from "react-router-dom";
function UserSignup(props) {
    const dispatch = useDispatch();
    const errorMessage = useSelector((state) => state.user.errorMessage);
    async function handleClick(e) {
        e.preventDefault();
        const password = document.getElementsByName("password")[0].value;
        const email = document.getElementsByName("email")[0].value;
        const firstName = document.getElementsByName("firstName")[0].value;
        const lastName = document.getElementsByName("lastName")[0].value;
        dispatch(userSignup({ email, password, firstName, lastName }));
        document.getElementsByName("password")[0].value = "";
    }

    const isUserLogged = useSelector((state) => state.user.isUserLogged);

    if (isUserLogged) return <Navigate to="/user/dashboard" replace />;

    return (
        <div>
            <form onSubmit={(e) => handleClick(e)} method="post">
                <input type="text" name="email" />
                <input type="text" name="firstName" />
                <input type="text" name="lastName" />
                <input type="text" name="password" />
                <button>Signup</button>
            </form>
            <h2>{errorMessage}</h2>
        </div>
    );
}

export default UserSignup;
