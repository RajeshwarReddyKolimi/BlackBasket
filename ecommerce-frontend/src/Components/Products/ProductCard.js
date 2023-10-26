import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart, toWishlist } from "../../Redux/Thunks/userThunks";
import { uploadProductImages } from "../../Redux/Thunks/productThunks";
function ProductCard(props) {
    const { item } = props;
    const dispatch = useDispatch();
    function addCart() {
        dispatch(addToCart(item._id));
    }
    function wishlist() {
        dispatch(toWishlist(item._id));
    }

    return (
        <div className="container-sm border border-dark mx-2">
            <img src={`${item.images[0] ? item.images[0] : ""}`} alt="image" />
            <h2>{item.title}</h2>
            <h3>{item.price}</h3>
            <h4>{item._id}</h4>
            <button onClick={addCart}>Add to Cart</button>
            <button onClick={wishlist}>Wishlist</button>
        </div>
    );
}

export default ProductCard;
