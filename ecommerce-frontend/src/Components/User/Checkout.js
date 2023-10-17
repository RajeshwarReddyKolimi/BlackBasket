import React from "react";
import { useSelector } from "react-redux";
import { NavLink, Navigate } from "react-router-dom";

function Checkout() {
    const data = useSelector((state) => state.user.userData);

    const isUserLogged = useSelector((state) => state.user.isUserLogged);
    if (!isUserLogged) return <Navigate to="/" replace />;
    return (
        <div>
            <div>Confirm Address: {data.address}</div>
            <NavLink to="/payment">Pay {data.cart.totalPrice}</NavLink>
        </div>
    );
}

export default Checkout;
