import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux";
import "../../styles/product.css";
import "../../styles/home.css";
import HomeProductCard from "./HomeProductCard";
import { topRated } from "../../Redux/Thunks/homeListThunks";
function TopRated() {
    useEffect(() => {
        search();
    }, []);
    const productsData = useSelector((state) => state.homeList.topRated);
    const dispatch = useDispatch();
    async function search() {
        dispatch(topRated());
    }
    return (
        <div className="home-section">
            <span className="home-header-title">Top Rated</span>
            <div className="home-products-container">
                {productsData &&
                    productsData.map((item, key) => (
                        <HomeProductCard key={key} item={item} />
                    ))}
            </div>
        </div>
    );
}

export default TopRated;
