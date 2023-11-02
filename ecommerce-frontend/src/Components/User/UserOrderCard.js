import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";
import ProductCard from "../Products/ProductCard";
import CartCard from "./CartCard";
import "../../styles/product.css";
import UserAddressCard from "./UserAddressCard";
import UserCouponCard from "./UserCouponCard";
import findToken from "../../findToken";
import axios from "axios";
function UserOrderCard() {
    const { id } = useParams();
    useEffect(() => {
        getUserOrderById(id);
    }, []);
    const [order, setOrder] = useState({});
    async function getUserOrderById(id) {
        try {
            const token = await findToken();
            const response = await axios.get(`${apiUrl}/user/orders/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            setOrder(response.data);
        } catch (error) {
            console.error("Fetch error:", error);
        }
    }
    console.log(order);
    const isUserLogged = useSelector((state) => state.user.isUserLogged);
    if (!isUserLogged) return <Navigate to="/user/login" replace />;
    return (
        <div>
            <div className="order-card">
                <div className=" products-container">
                    {order &&
                        order.items &&
                        order.items.map((item, key) => (
                            <CartCard key={key} item={item} />
                        ))}
                </div>
                <div className="address-container">
                    {order && order.address && (
                        <UserAddressCard address={order.address} />
                    )}
                </div>
                <div className="address-container">
                    {order && order.coupon && (
                        <UserCouponCard coupon={order.coupon.coupon} />
                    )}
                </div>

                <h4>Total Cart Price: {order && order.totalPrice} </h4>
                <h4>Final Price: {order && order.finalPrice} </h4>
            </div>
        </div>
    );
}

export default UserOrderCard;
