import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, toWishlist } from "../../Redux/Thunks/userThunks";
import { Navigate } from "react-router-dom";
function CartCard(props) {
    const { item } = props;
    const dispatch = useDispatch();
    function removeCart() {
        dispatch(removeFromCart(item.product._id));
    }
    function wishlist() {
        dispatch(toWishlist(item.product._id));
    }
    const isUserLogged = useSelector((state) => state.user.isUserLogged);
    if (!isUserLogged) return <Navigate to="/" replace />;
    return (
        <div className="container-sm border border-dark mx-2">
            <img
                src={`https://res.cloudinary.com/dxihuk20v/image/upload/v1697131467/wxemkw5pjyfvegcprgja.jpg`}
                alt="image"
            />
            <h2>{item.product.title}</h2>
            <h3>{item.product.price}</h3>
            <h4>{item.product._id}</h4>
            <h4>{item.quantity}</h4>
            <button onClick={removeCart}>Remove from Cart</button>
            <button onClick={wishlist}>Wishlist</button>
        </div>
    );
}

export default CartCard;
