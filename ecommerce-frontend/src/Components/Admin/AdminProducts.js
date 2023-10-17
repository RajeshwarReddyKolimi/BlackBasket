import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminProductCard from "./AdminProductCard";
import { createProduct, getProducts } from "../../Redux/Thunks/productThunks";

function AdminProducts() {
    const dispatch = useDispatch();
    const productsData = useSelector((state) => state.product.products);

    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);
    function create() {
        dispatch(createProduct());
    }
    return (
        <div>
            <h2>Products</h2>
            <button onClick={create}>Create</button>
            <div className="container-sm w-50 d-flex flex-row flex-wrap">
                {productsData &&
                    productsData.map((item, key) => (
                        <AdminProductCard key={key} item={item} />
                    ))}
            </div>
        </div>
    );
}

export default AdminProducts;
