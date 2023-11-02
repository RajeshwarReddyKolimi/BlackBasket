import React, { useState } from "react";
import {
    createProduct,
    uploadProductImages,
} from "../../Redux/Thunks/productThunks";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

function AdminAddProduct() {
    const dispatch = useDispatch();
    const [product, setProduct] = useState({
        title: "",
        brand: "",
        originalPrice: 0,
        price: 0,
        quantity: 0,
        color: "",
        description: "",
        category: "",
    });
    const [uploadImages, setUploadImages] = useState([]);
    function handleAddProduct(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append("title", product.title);
        formData.append("brand", product.brand);
        formData.append("originalPrice", product.originalPrice);
        formData.append("price", product.price);
        formData.append("quantity", product.quantity);
        formData.append("color", product.color);
        formData.append("description", product.description);
        formData.append("category", product.category);
        for (const file of uploadImages) {
            formData.append("images", file);
        }
        dispatch(createProduct({ formData }));
    }
    return (
        <div>
            <form
                onSubmit={(e) => {
                    handleAddProduct(e);
                }}
                className="add-product-form"
            >
                <div className="product-form-item">
                    <label for="product-title" className="product-form-label">
                        Product Name
                    </label>
                    <input
                        type="text"
                        name="product-title"
                        className="product-form-input"
                        onChange={(e) =>
                            setProduct((prev) => {
                                return { ...prev, title: e.target.value };
                            })
                        }
                        required
                    />
                </div>
                <div className="product-form-item">
                    <label for="product-brand" className="product-form-label">
                        Product Brand
                    </label>
                    <input
                        type="text"
                        name="product-brand"
                        className="product-form-input"
                        onChange={(e) =>
                            setProduct((prev) => {
                                return { ...prev, brand: e.target.value };
                            })
                        }
                        required
                    />
                </div>
                <div className="product-form-item">
                    <label for="product-color" className="product-form-label">
                        Color
                    </label>
                    <input
                        type="text"
                        name="product-color"
                        className="product-form-input"
                        onChange={(e) =>
                            setProduct((prev) => {
                                return { ...prev, color: e.target.value };
                            })
                        }
                        required
                    />
                </div>
                <div className="product-form-item">
                    <label for="product-price" className="product-form-label">
                        Price
                    </label>
                    <input
                        type="number"
                        name="product-price"
                        className="product-form-input"
                        onChange={(e) =>
                            setProduct((prev) => {
                                return { ...prev, price: e.target.value };
                            })
                        }
                        min={1}
                        required
                    />
                </div>
                <div className="product-form-item">
                    <label
                        for="product-originalPrice"
                        className="product-form-label"
                    >
                        Original Price
                    </label>
                    <input
                        type="number"
                        name="product-originalPrice"
                        className="product-form-input"
                        onChange={(e) =>
                            setProduct((prev) => {
                                return {
                                    ...prev,
                                    originalPrice: e.target.value,
                                };
                            })
                        }
                        min={1}
                        required
                    />
                </div>
                <div className="product-form-item">
                    <label
                        for="product-category"
                        className="product-form-label"
                    >
                        Category
                    </label>
                    <input
                        type="text"
                        name="product-category"
                        className="product-form-input"
                        onChange={(e) =>
                            setProduct((prev) => {
                                return { ...prev, category: e.target.value };
                            })
                        }
                        required
                    />
                </div>
                <div className="product-form-item">
                    <label
                        for="product-quantity"
                        className="product-form-label"
                    >
                        Quantity
                    </label>
                    <input
                        type="number"
                        name="product-quantity"
                        className="product-form-input"
                        onChange={(e) =>
                            setProduct((prev) => {
                                return { ...prev, quantity: e.target.value };
                            })
                        }
                        min={1}
                        required
                    />
                </div>
                <div className="product-form-item">
                    <label
                        for="product-description"
                        className="product-form-label"
                    >
                        Description
                    </label>
                    <input
                        type="text"
                        name="product-description"
                        className="product-form-input"
                        onChange={(e) =>
                            setProduct((prev) => {
                                return { ...prev, description: e.target.value };
                            })
                        }
                        required
                    />
                </div>
                <div className="product-form-item">
                    <label for="images" className="product-form-label">
                        Images
                    </label>
                    <input
                        type="file"
                        name="images"
                        className="product-form-input"
                        onChange={(e) => setUploadImages(e.target.files)}
                        multiple
                        required
                    />
                </div>

                <button type="submit" className="button-1-full">
                    Add
                </button>
            </form>
        </div>
    );
}

export default AdminAddProduct;
