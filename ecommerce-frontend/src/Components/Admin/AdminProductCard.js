import React from "react";
import { useDispatch } from "react-redux";
import { addToCart, toWishlist } from "../../Redux/Thunks/userThunks";
import {
    createProduct,
    deleteProduct,
    updateProduct,
} from "../../Redux/Thunks/productThunks";
function AdminProductCard(props) {
    const { item } = props;
    const dispatch = useDispatch();
    function update() {
        dispatch(updateProduct(item._id));
    }
    function deleteProd() {
        dispatch(deleteProduct(item._id));
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
            <button onClick={update}>Update</button>
            <button onClick={deleteProd}>Delete</button>
        </div>
    );
}

export default AdminProductCard;
