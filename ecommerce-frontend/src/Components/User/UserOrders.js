import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { getUserDetails, getUserOrders } from "../../Redux/Thunks/userThunks";
import UserOrderCard from "./UserOrderCard";
import UserOrderListCard from "./UserOrderListCard";

function UserOrders() {
    const dispatch = useDispatch();
    const isUserLogged = useSelector((state) => state.user.isUserLogged);
    const userOrders = useSelector((state) => state.user.userData.orders);
    useEffect(() => {
        dispatch(getUserDetails());
        dispatch(getUserOrders());
    }, []);
    if (!isUserLogged) return <Navigate to="/user/login" replace />;
    console.log("Orders", userOrders);
    return (
        <div>
            <h3>My Orders</h3>
            {userOrders && userOrders.length > 0 ? (
                <div className="order-container">
                    {userOrders.map((order, key) => (
                        <UserOrderListCard key={key} order={order} />
                    ))}
                </div>
            ) : (
                <div>Not Ordered yet</div>
            )}
        </div>
    );
}

export default UserOrders;
