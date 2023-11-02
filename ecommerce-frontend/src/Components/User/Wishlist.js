import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux";
import { getWishlist } from "../../Redux/Thunks/userThunks";
import ProductCard from "../Products/ProductCard";
import { Navigate } from "react-router-dom";
import "../../styles/product.css";
function Wishlist() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getWishlist());
    }, []);
    const wishlistData = useSelector((state) => state.user.userData.wishlist);

    const isUserLogged = useSelector((state) => state.user.isUserLogged);
    if (!isUserLogged) return <Navigate to="/" replace />;
    return (
        <div>
            <h2>Wishlist Products</h2>
            <div className="products-container">
                {wishlistData &&
                    wishlistData.map((item, key) => (
                        <ProductCard key={key} item={item} />
                    ))}
            </div>
        </div>
    );
}

export default Wishlist;
