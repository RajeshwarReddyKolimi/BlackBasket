import React from "react";
import { NavLink } from "react-router-dom";
import "../../styles/orders.css";
function UserOrderListCard({ order }) {
    let date = "";
    if (order && order.time) {
        const inputDate = new Date(order.time);
        const options = { year: "numeric", month: "short", day: "numeric" };
        date = inputDate.toLocaleDateString("en-US", options);
    }
    return (
        <div className="order-list-item">
            <NavLink to={`/user/orders/${order._id}`}>
                <h5>{order && order.items && order.items.length} Products</h5>
                <h6>{date}</h6>
            </NavLink>
        </div>
    );
}

export default UserOrderListCard;
