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
        <div className="section">
            <form
                onSubmit={(e) => {
                    handleAddProduct(e);
                }}
                className="form"
            >
                <div className="form-item">
                    <label for="title" className="form-label">
                        Product Name
                    </label>
                    <input
                        type="text"
                        name="title"
                        className="form-input"
                        onChange={(e) =>
                            setProduct((prev) => {
                                return { ...prev, title: e.target.value };
                            })
                        }
                        required
                    />
                </div>
                <div className="form-item">
                    <label for="brand" className="form-label">
                        Product Brand
                    </label>
                    <input
                        type="text"
                        name="brand"
                        className="form-input"
                        onChange={(e) =>
                            setProduct((prev) => {
                                return { ...prev, brand: e.target.value };
                            })
                        }
                        required
                    />
                </div>
                <div className="form-item">
                    <label for="color" className="form-label">
                        Color
                    </label>
                    <input
                        type="text"
                        name="color"
                        className="form-input"
                        onChange={(e) =>
                            setProduct((prev) => {
                                return { ...prev, color: e.target.value };
                            })
                        }
                        required
                    />
                </div>
                <div className="form-item">
                    <label for="price" className="form-label">
                        Price
                    </label>
                    <input
                        type="number"
                        name="price"
                        className="form-input"
                        onChange={(e) =>
                            setProduct((prev) => {
                                return { ...prev, price: e.target.value };
                            })
                        }
                        min={1}
                        required
                    />
                </div>
                <div className="form-item">
                    <label for="originalPrice" className="form-label">
                        Original Price
                    </label>
                    <input
                        type="number"
                        name="originalPrice"
                        className="form-input"
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
                <div className="form-item">
                    <label for="category" className="form-label">
                        Category
                    </label>
                    <input
                        type="text"
                        name="category"
                        className="form-input"
                        onChange={(e) =>
                            setProduct((prev) => {
                                return { ...prev, category: e.target.value };
                            })
                        }
                        required
                    />
                </div>
                <div className="form-item">
                    <label for="quantity" className="form-label">
                        Quantity
                    </label>
                    <input
                        type="number"
                        name="quantity"
                        className="form-input"
                        onChange={(e) =>
                            setProduct((prev) => {
                                return { ...prev, quantity: e.target.value };
                            })
                        }
                        min={1}
                        required
                    />
                </div>
                <div className="form-item">
                    <label for="description" className="form-label">
                        Description
                    </label>
                    <input
                        type="text"
                        name="description"
                        className="form-input"
                        onChange={(e) =>
                            setProduct((prev) => {
                                return { ...prev, description: e.target.value };
                            })
                        }
                        required
                    />
                </div>
                <div className="form-item">
                    <label for="images" className="form-label">
                        Images
                    </label>
                    <input
                        type="file"
                        name="images"
                        className="form-input"
                        onChange={(e) => setUploadImages(e.target.files)}
                        multiple
                        required
                    />
                </div>

                <button type="submit" className="button-full">
                    Add
                </button>
            </form>
        </div>
    );
}

export default AdminAddProduct;
