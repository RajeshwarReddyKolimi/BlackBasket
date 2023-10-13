import React, { useEffect } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import Dashboard from "./Dashboard";
import Login from "./Login";
import { useDispatch } from "react-redux";
import { checkStatus } from "../Redux/Reducers/authSlice";
function Home() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(checkStatus());
    }, [dispatch]);
    const isLoggedIn = useSelector((state) => state.user.loginStatus);
    return <div>{isLoggedIn ? <Dashboard /> : <Login />}</div>;
}

export default Home;
