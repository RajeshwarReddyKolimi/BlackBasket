import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux";
import CartCard from "./CartCard";
import { getCart } from "../Redux/Thunks/userThunks";
function Cart() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCart());
    }, []);
    const cartData = useSelector((state) => state.user.userData.cart);
    return (
        <div>
            <h2>Cart Products</h2>
            <div className="container-sm w-50 d-flex flex-row flex-wrap">
                {cartData &&
                    cartData.map((item, key) => (
                        <CartCard key={key} item={item} />
                    ))}
            </div>
        </div>
    );
}

export default Cart;
