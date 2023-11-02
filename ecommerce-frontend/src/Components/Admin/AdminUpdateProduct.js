import React, { useEffect, useState } from "react";
import {
    createProduct,
    getProductById,
    updateProduct,
    uploadProductImages,
} from "../../Redux/Thunks/productThunks";
import { Navigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

function AdminUpdateProduct() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const currentProduct = useSelector(
        (state) => state.product.searchedProduct
    );
    useEffect(() => {
        dispatch(getProductById(id));
    }, []);
    const [product, setProduct] = useState({
        title: currentProduct.title,
        brand: currentProduct.brand,
        originalPrice: currentProduct.originalPrice,
        price: currentProduct.price,
        quantity: currentProduct.quantity,
        color: currentProduct.color,
        description: currentProduct.description,
        category: currentProduct.category,
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
        dispatch(updateProduct({ formData, id }));
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
                        defaultValue={currentProduct && currentProduct.title}
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
                        defaultValue={currentProduct && currentProduct.brand}
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
                        defaultValue={currentProduct && currentProduct.color}
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
                        defaultValue={currentProduct && currentProduct.price}
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
                        defaultValue={
                            currentProduct && currentProduct.originalPrice
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
                        defaultValue={currentProduct && currentProduct.category}
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
                        defaultValue={currentProduct && currentProduct.quantity}
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
                        defaultValue={
                            currentProduct && currentProduct.description
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
                    Update
                </button>
            </form>
        </div>
    );
}

export default AdminUpdateProduct;
