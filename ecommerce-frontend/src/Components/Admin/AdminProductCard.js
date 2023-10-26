import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart, toWishlist } from "../../Redux/Thunks/userThunks";
import {
    createProduct,
    deleteProduct,
    updateProduct,
    uploadProductImages,
} from "../../Redux/Thunks/productThunks";
function AdminProductCard(props) {
    const { item } = props;
    const [uploadImages, setUploadImages] = useState([]);
    const dispatch = useDispatch();
    function update() {
        dispatch(updateProduct(item._id));
    }
    function deleteProd() {
        dispatch(deleteProduct(item._id));
    }
    function handleUpload(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append("Image", "VALUE");
        for (const file of uploadImages) {
            formData.append("images", file);
        }
        dispatch(uploadProductImages({ formData, productId: item._id }));
    }
    return (
        <div className="container-sm border border-dark mx-2">
            <img src={`${item.images[0] ? item.images[0] : ""}`} alt="image" />
            <h2>{item.title}</h2>
            <h3>{item.price}</h3>
            <h4>{item._id}</h4>
            <button onClick={update}>Update</button>
            <button onClick={deleteProd}>Delete</button>
            <form onSubmit={(e) => handleUpload(e)}>
                <input
                    type="file"
                    name="images"
                    multiple
                    onChange={(e) => setUploadImages(e.target.files)}
                ></input>
                <button type="submit">Upload</button>
            </form>
        </div>
    );
}

export default AdminProductCard;
