import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { getUserDetails, getUserOrders } from "../../Redux/Thunks/userThunks";
import UserOrderListCard from "./UserOrderListCard";
import Empty from "../Empty";
function UserOrders() {
    const dispatch = useDispatch();
    const isUserLogged = useSelector((state) => state.user.isUserLogged);
    const userOrders = useSelector((state) => state.user.userData.orders);
    useEffect(() => {
        dispatch(getUserDetails());
        dispatch(getUserOrders());
    }, [dispatch]);
    if (!isUserLogged) return <Navigate to="/user/login" replace />;
    return (
        <div className="section">
            <div className="header-title">My Orders</div>
            {userOrders && userOrders.length > 0 ? (
                <div className="order-list-container">
                    {userOrders.map((order, key) => (
                        <UserOrderListCard key={key} order={order} />
                    ))}
                </div>
            ) : (
                <Empty text="No orders" />
            )}
        </div>
    );
}

export default UserOrders;
