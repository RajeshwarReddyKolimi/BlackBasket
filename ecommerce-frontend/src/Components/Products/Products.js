import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux";
import { getProducts } from "../../Redux/Thunks/productThunks";
function Products() {
    const dispatch = useDispatch();
    const productsData = useSelector((state) => state.product.products);
    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);

    return (
        <div>
            <h2>Products</h2>
            <div className="container-sm w-50 d-flex flex-row flex-wrap">
                {productsData &&
                    productsData.map((item, key) => (
                        <ProductCard key={key} item={item} />
                    ))}
            </div>
        </div>
    );
}

export default Products;