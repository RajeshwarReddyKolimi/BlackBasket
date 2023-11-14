import React, { useEffect, useState } from "react";
import {
    createProduct,
    getProductById,
    updateProduct,
    uploadProductImages,
} from "../../Redux/Thunks/productThunks";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

function AdminUpdateProduct() {
    const navigate = useNavigate();
    const { id } = useParams();
    const dispatch = useDispatch();
    const currentProduct = useSelector(
        (state) => state.product.searchedProduct
    );
    useEffect(() => {
        dispatch(getProductById(id));
    }, []);
    const [product, setProduct] = useState({
        title: currentProduct && currentProduct.title,
        brand: currentProduct && currentProduct.brand,
        originalPrice: currentProduct && currentProduct.originalPrice,
        price: currentProduct && currentProduct.price,
        quantity: currentProduct && currentProduct.quantity,
        color: currentProduct && currentProduct.color,
        description: currentProduct && currentProduct.description,
        category: currentProduct && currentProduct.category,
    });
    const [uploadImages, setUploadImages] = useState([]);
    function handleUpdateProduct(e) {
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
        navigate(-1);
    }
    return (
        <div className="section">
            <div className="section-header">
                <div className="header-title">Edit Product</div>
                <button
                    type="submit"
                    className="button"
                    onClick={(e) => handleUpdateProduct(e)}
                >
                    Update
                </button>
            </div>
            <form
                onSubmit={(e) => {
                    handleUpdateProduct(e);
                }}
                className="form"
            >
                <div className="form-item">
                    <label for="product-title" className="form-label">
                        Product Name
                    </label>
                    <input
                        type="text"
                        name="product-title"
                        className="form-input"
                        onChange={(e) =>
                            setProduct((prev) => {
                                return { ...prev, title: e.target.value };
                            })
                        }
                        defaultValue={currentProduct && currentProduct.title}
                        required
                    />
                </div>
                <div className="form-item">
                    <label for="product-brand" className="form-label">
                        Product Brand
                    </label>
                    <input
                        type="text"
                        name="product-brand"
                        className="form-input"
                        onChange={(e) =>
                            setProduct((prev) => {
                                return { ...prev, brand: e.target.value };
                            })
                        }
                        defaultValue={currentProduct && currentProduct.brand}
                        required
                    />
                </div>
                <div className="form-item">
                    <label for="product-color" className="form-label">
                        Color
                    </label>
                    <input
                        type="text"
                        name="product-color"
                        className="form-input"
                        onChange={(e) =>
                            setProduct((prev) => {
                                return { ...prev, color: e.target.value };
                            })
                        }
                        defaultValue={currentProduct && currentProduct.color}
                        required
                    />
                </div>
                <div className="form-item">
                    <label for="product-price" className="form-label">
                        Price
                    </label>
                    <input
                        type="number"
                        name="product-price"
                        className="form-input"
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
                <div className="form-item">
                    <label for="product-originalPrice" className="form-label">
                        Original Price
                    </label>
                    <input
                        type="number"
                        name="product-originalPrice"
                        className="form-input"
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
                <div className="form-item">
                    <label for="product-category" className="form-label">
                        Category
                    </label>
                    <input
                        type="text"
                        name="product-category"
                        className="form-input"
                        onChange={(e) =>
                            setProduct((prev) => {
                                return { ...prev, category: e.target.value };
                            })
                        }
                        defaultValue={currentProduct && currentProduct.category}
                        required
                    />
                </div>
                <div className="form-item">
                    <label for="product-quantity" className="form-label">
                        Quantity
                    </label>
                    <input
                        type="number"
                        name="product-quantity"
                        className="form-input"
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
                <div className="form-item">
                    <label for="product-description" className="form-label">
                        Description
                    </label>
                    <textarea
                        type="text"
                        name="product-description"
                        className="form-input"
                        onChange={(e) => {
                            setProduct((prev) => {
                                return { ...prev, description: e.target.value };
                            });
                        }}
                        defaultValue={
                            currentProduct && currentProduct.description
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
            </form>
        </div>
    );
}

export default AdminUpdateProduct;
