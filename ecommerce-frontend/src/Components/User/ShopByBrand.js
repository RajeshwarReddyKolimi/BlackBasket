import React, { useEffect } from "react";
import { getBrands } from "../../Redux/Thunks/brandThunks";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import "../../styles/home.css";
function ShopByBrand() {
    const dispatch = useDispatch();
    const brands = useSelector((state) => state.brand.brands);
    useEffect(() => {
        dispatch(getBrands());
    }, [dispatch]);
    return (
        <div className="home-section">
            <span className="home-header-title">Shop By Brand</span>
            <div className="home-section-container">
                {brands &&
                    brands.map((brand, key) => (
                        <NavLink
                            key={key}
                            to={`/product/search?id=${brand.name}`}
                            className="home-brand-link"
                        >
                            <div className="home-brand-image-container">
                                <img
                                    src={brand.logo}
                                    alt=""
                                    className="home-brand-image"
                                />
                            </div>
                        </NavLink>
                    ))}
            </div>
        </div>
    );
}

export default ShopByBrand;
