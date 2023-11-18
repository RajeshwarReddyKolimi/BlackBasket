import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux";
import "../../styles/product.css";
import "../../styles/home.css";
import HomeProductCard from "./HomeProductCard";
import { topRated } from "../../Redux/Thunks/homeListThunks";
import { NavLink } from "react-router-dom";
function TopRated() {
    useEffect(() => {
        search();
    }, []);
    const productsData = useSelector((state) => state.homeList.topRated);

    const loading = useSelector((state) => state.homeList.topRatedLoading);
    const dispatch = useDispatch();
    async function search() {
        dispatch(topRated());
    }
    return (
        <div className="home-section home-section-last">
            <div className="section-header">
                <div className="home-header-title">Best Deals</div>
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

export default TopRated;
