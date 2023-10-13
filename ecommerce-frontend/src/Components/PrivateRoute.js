import React from "react";
import { Navigate, Route } from "react-router-dom";
import Login from "./Login";
import { useSelector } from "react-redux";

export default function PrivateRoute({ path }) {
    const isLoggedIn = useSelector((state) => state.user.loginStatus);
    return isLoggedIn ? (
        <Route path={path} />
    ) : (
        <Navigate to="/login" replace />
    );
}
