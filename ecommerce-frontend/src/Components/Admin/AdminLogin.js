import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { adminLogin } from "../../Redux/Thunks/adminThunks";
import Dashboard from "../User/Dashboard";
import Home from "../Home";
import { Navigate, useNavigate } from "react-router-dom";
function AdminLogin(props) {
    const dispatch = useDispatch();
    const errorMessage = useSelector((state) => state.admin.errorMessage);
    async function handleClick(e) {
        e.preventDefault();
        const password = document.getElementsByName("password")[0].value;
        const email = document.getElementsByName("email")[0].value;
        dispatch(adminLogin({ email, password }));
        document.getElementsByName("password")[0].value = "";
    }
    const isAdminLogged = useSelector((state) => state.admin.isAdminLogged);
    if (isAdminLogged) return <Navigate to="/admin/dashboard" replace />;
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

export default AdminLogin;
