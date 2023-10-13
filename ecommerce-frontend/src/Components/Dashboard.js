import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import Products from "./Products";
import { getUserDetails, userLogout } from "../Redux/Thunks/userThunks";

function Dashboard() {
    const dispatch = useDispatch();
    const loginStatus = useSelector((state) => state.user.loginStatus);
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
    return (
        <div>
            <h1>Welcome {data && data.firstName && data.firstName}</h1>
            <button onClick={logout}>Logout</button>
            <h4>{data && data.address && data.address}</h4>
            <h4>{data && data.email && data.email}</h4>
            <h4>{data && data.role && data.role}</h4>
            <h3>
                <NavLink to="/cart">
                    Cart {data && data.cartSize ? data.cartSize : 0}
                </NavLink>
            </h3>
            <h3>
                <NavLink to="/wishlist">
                    Wishlist {data && data.wishlistSize ? data.wishlistSize : 0}
                </NavLink>
            </h3>

            <Products />
        </div>
    );
}

export default Dashboard;
