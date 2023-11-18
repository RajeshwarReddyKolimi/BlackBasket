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
import apiUrl from "../../apiUrl";
import axios from "axios";
import { setErrorMessage } from "../../Redux/Reducers/globalSlice";

function AdminProducts() {
    const dispatch = useDispatch();
    const productsData = useSelector((state) => state.product.products);
    const [searchInput, setSearchInput] = useState("");
    const [searchedProduct, setSearchedProduct] = useState(null);
    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);
    function handleSearchById(e) {
        e.preventDefault();
        getProductById();
    }
    async function getProductById() {
        if (searchInput.trim() !== "") {
            try {
                const response = await axios.get(
                    `${apiUrl}/product/${searchInput}`,
                    {
                        withCredentials: true,
                    }
                );
                console.log(response.data);
                setSearchedProduct(response.data);
            } catch (error) {
                dispatch(setErrorMessage("Invalid product Id"));
                console.error(error);
            }
        }
    }
    return (
        <div className="section">
            <div className="section-header">
                <div className="header-title">Products</div>
                <NavLink to="/admin/product/add" className="button">
                    Add Product
                </NavLink>
            </div>
            <div className="search-product-id">
                <form
                    onSubmit={(e) => handleSearchById(e)}
                    className="button-container"
                >
                    <input
                        type="text"
                        className="form-input"
                        onChange={(e) => {
                            setSearchedProduct(null);
                            setSearchInput(e.target.value);
                        }}
                        placeholder="Search by Id"
                    ></input>
                    <button
                        type="submit"
                        className="button-inverse"
                        onClick={(e) => handleSearchById(e)}
                    >
                        Submit
                    </button>
                </form>
                {searchedProduct && (
                    <div className="products-container">
                        <AdminProductCard item={searchedProduct} />
                    </div>
                )}
            </div>

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
