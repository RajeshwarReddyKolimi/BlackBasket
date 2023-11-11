import React from "react";
import { NavLink } from "react-router-dom";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import "../../styles/orders.css";
function UserOrderListCard({ order }) {
    let date = "";
    if (order && order.time) {
        const inputDate = new Date(order.time);
        const options = { year: "numeric", month: "short", day: "numeric" };
        date = inputDate.toLocaleDateString("en-US", options);
    }
    return (
        <NavLink className="order-list-item" to={`/user/orders/${order._id}`}>
            <div>{order && order.items && order.items.length} Products</div>
            <div>{date}</div>
            <IoCheckmarkDoneCircleOutline className="order-success-icon" />
        </NavLink>
    );
}

export default UserOrderListCard;
