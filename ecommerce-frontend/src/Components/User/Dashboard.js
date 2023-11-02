import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, Navigate } from "react-router-dom";
import Products from "../Products/Products";
import { getUserDetails, userLogout } from "../../Redux/Thunks/userThunks";

function Dashboard() {
    const dispatch = useDispatch();
    const isUserLogged = useSelector((state) => state.user.isUserLogged);
    const errorMessage = useSelector((state) => state.user.errorMessage);

    useEffect(() => {
        getDetails();
    }, []);
    const data = useSelector((state) => state.user.userData);

    function getDetails() {
        dispatch(getUserDetails());
    }
    function logout() {
        dispatch(userLogout());
    }
    if (!isUserLogged) return <Navigate to="/" replace />;
    return (
        <div>
            <Products />
        </div>
    );
}

export default Dashboard;
