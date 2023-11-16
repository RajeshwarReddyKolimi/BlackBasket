import React from "react";
import Slider from "./Slider";
import ShopByCategory from "./ShopByCategory";
import ShopByBrand from "./ShopByBrand";
import BestSellers from "./BestSellers";
import RecentProducts from "./RecentProducts";
import TopRated from "./TopRated";
import UserFooter from "./UserFooter";

function Dashboard() {
    return (
        <div>
            <Slider />
            <ShopByCategory />
            <ShopByBrand />
            <BestSellers />
            <RecentProducts />
            <TopRated />
            <UserFooter />
        </div>
    );
}

export default Dashboard;
