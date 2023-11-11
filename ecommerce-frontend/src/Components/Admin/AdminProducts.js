import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminProductCard from "./AdminProductCard";
import {
    createProduct,
    getProductById,
    getProducts,
} from "../../Redux/Thunks/productThunks";
import { NavLink } from "react-router-dom";
import "../../styles/product.css";

function AdminProducts() {
    const dispatch = useDispatch();
    const productsData = useSelector((state) => state.product.products);
    const searchedProduct = useSelector(
        (state) => state.product.searchedProduct
    );
    const [searchInput, setSearchInput] = useState();
    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);
    function handleSearchById(e) {
        e.preventDefault();
        dispatch(getProductById(searchInput));
    }
    return (
        <div>
            <h2>Products</h2>
            <NavLink to="/admin/product/add" className="button-full">
                Add Product
            </NavLink>
            <form onSubmit={(e) => handleSearchById(e)}>
                <input
                    type="text"
                    className=""
                    onChange={(e) => setSearchInput(e.target.value)}
                ></input>
                <button type="submit" className="button-full">
                    Submit
                </button>
            </form>
            {searchedProduct && (
                <div className="products-container">
                    <AdminProductCard item={searchedProduct} />
                </div>
            )}
            <div className="products-container">
                {productsData &&
                    productsData.map((item, key) => (
                        <AdminProductCard key={key} item={item} />
                    ))}
            </div>
        </div>
    );
}

export default AdminProducts;
