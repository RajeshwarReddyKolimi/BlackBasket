import React, { useEffect } from "react";
import Home from "../Home";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function Payment() {
    useEffect(() => {
        setTimeout(() => {
            alert("Redirecting");
        }, 3000);
    }, []);
    const isUserLogged = useSelector((state) => state.user.isUserLogged);
    if (!isUserLogged) return <Navigate to="/" replace />;

    return <div>Payment Successful</div>;
}

export default Payment;
