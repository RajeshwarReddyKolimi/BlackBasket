import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, Navigate } from "react-router-dom";
import Products from "../Products/Products";
import { adminLogout, getAdminDetails } from "../../Redux/Thunks/adminThunks";

function AdminDashboard() {
    const dispatch = useDispatch();
    const isAdminLogged = useSelector((state) => state.admin.isAdminLogged);
    const errorMessage = useSelector((state) => state.admin.errorMessage);
    useEffect(() => {
        getDetails();
    }, [dispatch]);
    const data = useSelector((state) => state.admin.adminData);

    function getDetails() {
        dispatch(getAdminDetails());
    }
    function logout() {
        dispatch(adminLogout());
    }
    if (!isAdminLogged) return <Navigate to="/" replace />;
    return (
        <div className="d-flex flex-column">
            <h3>Admin Dashboard</h3>
            <h4>Hello {data.firstName}</h4>
            <button onClick={logout}>Logout</button>
            <NavLink to="/admin/products"> Products </NavLink>
            <NavLink to="/admin/users"> Users </NavLink>
            <NavLink to="/coupons"> Coupons </NavLink>
        </div>
    );
}

export default AdminDashboard;
