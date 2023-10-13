import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

function Checkout() {
    const data = useSelector((state) => state.user.userData);

    return (
        <div>
            <div>Confirm Address: {data.address}</div>
            <NavLink to="/payment">Pay {data.cart.totalPrice}</NavLink>
        </div>
    );
}

export default Checkout;
