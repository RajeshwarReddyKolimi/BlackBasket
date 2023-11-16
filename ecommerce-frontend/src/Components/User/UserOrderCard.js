import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";
import "../../styles/orders.css";
import "../../styles/address.css";
import axios from "axios";
import apiUrl from "../../apiUrl";
import OrderProductCard from "./OrderProductCard";
function UserOrderCard() {
    const { id } = useParams();
    useEffect(() => {
        getUserOrderById(id);
    }, [id]);
    const [order, setOrder] = useState({});
    async function getUserOrderById(id) {
        try {
            const response = await axios.get(`${apiUrl}/user/orders/${id}`, {
                withCredentials: true,
            });
            setOrder(response.data);
        } catch (error) {
            console.error("Fetch error:", error);
        }
    }
    let date = "";
    if (order && order.time) {
        const inputDate = new Date(order.time);
        const options = { year: "numeric", month: "short", day: "numeric" };
        date = inputDate.toLocaleDateString("en-US", options);
    }

    const isUserLogged = useSelector((state) => state.user.isUserLogged);
    if (!isUserLogged) return <Navigate to="/user/login" replace />;
    return (
        <div>
            <div className="order-page">
                <div className="header-title">Products</div>
                <div className="order-products-container">
                    {order &&
                        order.items &&
                        order.items.map((item, key) => (
                            <OrderProductCard key={key} item={item} />
                        ))}
                </div>
                <div className="address-container">
                    <div className="header-title">Address</div>
                    <div className="address-item">
                        <div className="address">{order && order.address} </div>
                    </div>
                </div>
                <div className="final-price-container">
                    <div className="final-price-item">
                        <span className="final-price-key">Date: </span>{" "}
                        <span className="final-price-value">{date}</span>
                    </div>
                    <div className="final-price-item">
                        <span className="final-price-key">Payment Mode: </span>{" "}
                        <span className="final-price-value">
                            Cash On Delivery
                        </span>
                    </div>
                    <div className="final-price-item">
                        <span className="final-price-key">Total Value: </span>{" "}
                        <span className="final-price-value">
                            ₹{order && order.totalPrice}
                        </span>
                    </div>
                    <div className="final-price-item">
                        <span className="final-price-key">
                            Coupon Discount :{" "}
                        </span>{" "}
                        <span className="final-price-value">
                            ₹{order && order.discount}
                        </span>
                    </div>
                    <div className="final-price-item">
                        <span className="final-price-key">Final Price : </span>{" "}
                        <span className="final-price-value">
                            ₹{order && order.finalPrice}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserOrderCard;
