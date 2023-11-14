import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux";
import { getProducts } from "../../Redux/Thunks/productThunks";
import "../../styles/product.css";
import "../../styles/home.css";
import ProductCard from "../Products/ProductCard";
import findToken from "../../findToken";
import axios from "axios";
import apiUrl from "../../apiUrl";
import HomeProductCard from "./HomeProductCard";
function BestSellers() {
    useEffect(() => {
        search();
    }, []);
    const [productsData, setProductsData] = useState([]);
    async function search() {
        try {
            const token = await findToken();
            const response = await axios.get(
                `${apiUrl}/product/search?sort=mostSold`,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            setProductsData(response.data);
        } catch (error) {
            console.error("Fetch error:", error);
        }
    }
    return (
        <div className="home-section">
            <span className="home-header-title">Best Sellers</span>
            <div className="home-products-container">
                {productsData &&
                    productsData.map((item, key) => (
                        <HomeProductCard key={key} item={item} />
                    ))}
            </div>
        </div>
    );
}

export default BestSellers;