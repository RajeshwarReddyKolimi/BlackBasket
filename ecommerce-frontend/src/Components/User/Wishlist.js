import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux";
import { getWishlist } from "../../Redux/Thunks/userThunks";
import ProductCard from "../Products/ProductCard";
import { Navigate } from "react-router-dom";
import "../../styles/product.css";
import Empty from "../Empty";
import WishlistCard from "./WishlistCard";
function Wishlist() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getWishlist());
    }, []);
    const wishlistData = useSelector((state) => state.user.userData.wishlist);
    const isUserLogged = useSelector((state) => state.user.isUserLogged);
    if (!isUserLogged) return <Navigate to="/user/login" replace />;
    return (
        <div className="section">
            <div className="header-title">Saved for Later</div>
            <div className="products-container">
                {wishlistData && wishlistData.length > 0 ? (
                    wishlistData.map((item, key) => (
                        <WishlistCard key={key} item={item} />
                    ))
                ) : (
                    <Empty text="No items saved for later" />
                )}
            </div>
        </div>
    );
}

export default Wishlist;
