import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux";
import { getProducts } from "../../Redux/Thunks/productThunks";
import "../../styles/product.css";
import "../../styles/home.css";

function Products() {
    const dispatch = useDispatch();
    const productsData = useSelector((state) => state.product.products);
    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);

    return (
        <div className="home-section">
            <span className="home-header-title">Products</span>
            <div className="products-container">
                {productsData &&
                    productsData.map((item, key) => (
                        <ProductCard key={key} item={item} />
                    ))}
            </div>
        </div>
    );
}

export default Products;
