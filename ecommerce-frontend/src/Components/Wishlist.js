import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux";
import { getWishlist } from "../Redux/Thunks/userThunks";
import ProductCard from "./ProductCard";
function Wishlist() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getWishlist());
    }, []);
    const wishlistData = useSelector((state) => state.user.userData.wishlist);
    return (
        <div>
            <h2>Wishlist Products</h2>
            <div className="container-sm w-50 d-flex flex-row flex-wrap">
                {wishlistData &&
                    wishlistData.map((item, key) => (
                        <ProductCard key={key} item={item} />
                    ))}
            </div>
        </div>
    );
}

export default Wishlist;
