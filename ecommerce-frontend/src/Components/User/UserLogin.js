import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../../Redux/Thunks/userThunks";
import Dashboard from "./Dashboard";
import Home from "../Home";
import { Navigate, useNavigate } from "react-router-dom";
function UserLogin(props) {
    const dispatch = useDispatch();
    const errorMessage = useSelector((state) => state.user.errorMessage);
    async function handleClick(e) {
        e.preventDefault();
        const password = document.getElementsByName("password")[0].value;
        const email = document.getElementsByName("email")[0].value;
        dispatch(userLogin({ email, password }));
        document.getElementsByName("password")[0].value = "";
    }
    const isUserLogged = useSelector((state) => state.user.isUserLogged);
    const isAdminLogged = useSelector((state) => state.user.isAdminLogged);
    if (isUserLogged) return <Navigate to="/user/dashboard" replace />;
    else if (isAdminLogged) return <Navigate to="/admin/dashboard" replace />;
    return (
        <div>
            <form onSubmit={(e) => handleClick(e)} method="post">
                <input type="text" name="email" />
                <input type="text" name="password" />
                <button>Login</button>
            </form>
            <h2>{errorMessage}</h2>
        </div>
    );
}

export default UserLogin;
