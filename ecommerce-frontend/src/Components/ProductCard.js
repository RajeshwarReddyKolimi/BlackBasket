import React from "react";
import { useDispatch } from "react-redux";
import { addToCart, toWishlist } from "../Redux/Thunks/userThunks";
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
            <img
                src={`https://res.cloudinary.com/dxihuk20v/image/upload/v1697131467/wxemkw5pjyfvegcprgja.jpg`}
                alt="image"
            />
            <h2>{item.title}</h2>
            <h3>{item.price}</h3>
            <h4>{item._id}</h4>
            <button onClick={addCart}>Add to Cart</button>
            <button onClick={wishlist}>Wishlist</button>
        </div>
    );
}

export default ProductCard;
