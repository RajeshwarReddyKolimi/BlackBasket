import React, { useEffect } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import Dashboard from "./User/Dashboard";
import Login from "./User/UserLogin";
import { useDispatch } from "react-redux";
import { NavLink, Navigate } from "react-router-dom";
import AdminDashboard from "./Admin/AdminDashboard";
import { getAdminDetails } from "../Redux/Thunks/adminThunks";
import { getUserDetails } from "../Redux/Thunks/userThunks";
function Home() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAdminDetails());
        dispatch(getUserDetails());
    }, [dispatch]);
    const isUserLogged = useSelector((state) => state.user.isUserLogged);
    const isAdminLogged = useSelector((state) => state.admin.isAdminLogged);
    return (
        <div>
            {isUserLogged ? (
                <Dashboard />
            ) : isAdminLogged ? (
                <AdminDashboard />
            ) : (
                <div className="d-flex flex-column">
                    <NavLink to="/user/login">User Login</NavLink>
                    <NavLink to="/user/signup">Create Account</NavLink>
                    <NavLink to="/admin/login">Admin Login</NavLink>
                </div>
            )}
        </div>
    );
}

export default Home;
