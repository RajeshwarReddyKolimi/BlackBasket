import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux";
import "../../styles/product.css";
import "../../styles/home.css";
import HomeProductCard from "./HomeProductCard";
import { bestSellers } from "../../Redux/Thunks/homeListThunks";
import { NavLink } from "react-router-dom";
function BestSellers() {
    useEffect(() => {
        search();
    }, []);
    const loading = useSelector((state) => state.homeList.bestSellersLoading);
    const productsData = useSelector((state) => state.homeList.bestSellers);
    const dispatch = useDispatch();
    async function search() {
        dispatch(bestSellers());
    }
    return (
        <div className="home-section">
            <div className="section-header">
                <div className="home-header-title">Best Sellers</div>
                <NavLink to="/product/search?id=" className="button">
                    More
                </NavLink>
            </div>
            <div className="home-products-container">
                {loading ? (
                    <div className="loading"></div>
                ) : (
                    productsData &&
                    productsData.map((item, key) => (
                        <HomeProductCard key={key} item={item} />
                    ))
                )}
            </div>
        </div>
    );
}

export default BestSellers;
