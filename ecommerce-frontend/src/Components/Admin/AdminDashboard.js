import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, Navigate } from "react-router-dom";
import { adminLogout, getAdminDetails } from "../../Redux/Thunks/adminThunks";

function AdminDashboard() {
    const dispatch = useDispatch();
    const isAdminLogged = useSelector((state) => state.admin.isAdminLogged);
    const errorMessage = useSelector((state) => state.admin.errorMessage);
    useEffect(() => {
        dispatch(getAdminDetails());
    }, [dispatch]);
    const data = useSelector((state) => state.admin.adminData);
    if (!isAdminLogged) return <Navigate to="/admin/login" replace />;
    function logout() {
        dispatch(adminLogout());
    }
    return (
        <div className="section">
            <div className="section-header">
                <div className="header-title">Dashboard</div>
                <button onClick={logout} className="button">
                    Logout
                </button>
            </div>
            <div className="header-title">{data.firstName}</div>
            <div className="button-container">
                <NavLink to="/admin/products" className="button-full">
                    {" "}
                    Products{" "}
                </NavLink>
                <NavLink to="/admin/users" className="button-full">
                    {" "}
                    Users{" "}
                </NavLink>
                <NavLink to="/admin/coupons" className="button-full">
                    {" "}
                    Coupons{" "}
                </NavLink>
            </div>
        </div>
    );
}

export default AdminDashboard;
