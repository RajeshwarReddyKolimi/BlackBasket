import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart, toWishlist } from "../../Redux/Thunks/userThunks";
import {
    createProduct,
    deleteProduct,
    updateProduct,
    uploadProductImages,
} from "../../Redux/Thunks/productThunks";
import "../../styles/product.css";
import { AiFillStar } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import { BiSolidEditAlt } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
function AdminProductCard(props) {
    const { item } = props;
    const [uploadImages, setUploadImages] = useState([]);
    const dispatch = useDispatch();
    function deleteProd() {
        dispatch(deleteProduct(item._id));
    }
    const id = item && item._id;
    return (
        <NavLink to={`/admin/product/${id}`}>
            <div to={`/product/${id}`} className="product-card">
                <div className="product-card-image-container">
                    <img
                        src={`${item && item.images[0] ? item.images[0] : ""}`}
                        alt="image"
                        className="product-card-poster-image"
                    />
                </div>
                <div className="product-card-rating">
                    <span className="product-card-rating-value">
                        {item && item.totalrating.toFixed(1)}
                    </span>
                    <AiFillStar className="product-card-rating-star" />
                </div>
                <div className="product-card-info">
                    <div className="product-card-brand">
                        {item && item.brand}
                    </div>
                    <div className="product-card-title">
                        {item && item.title}
                    </div>
                    <div className="product-card-price">
                        <div className="product-card-final-price">
                            {" "}
                            <span className="rupee-symbol">₹</span>
                            {item && item.price}{" "}
                        </div>

                        <span className="product-card-original-price">
                            <del>
                                {" "}
                                <span className="rupee-symbol">₹</span>
                                {item && item.originalPrice}{" "}
                            </del>
                        </span>
                        <span className="product-card-discount">
                            <span className="product-card-discount-value">
                                {Math.round(item && item.discount)}
                            </span>
                            % Off
                        </span>
                    </div>
                    <NavLink
                        to={`/admin/product/update/${id}`}
                        className="button-1-full"
                    >
                        <BiSolidEditAlt />
                    </NavLink>
                    <button className="button-1-full" onClick={deleteProd}>
                        <MdDelete />
                    </button>
                </div>
            </div>
        </NavLink>
    );
}

export default AdminProductCard;
