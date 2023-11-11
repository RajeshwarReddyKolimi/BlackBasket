import React, { useEffect } from "react";
import { getCategories } from "../../Redux/Thunks/categoryThunks";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import "../../styles/home.css";
function ShopByCategory() {
    const dispatch = useDispatch();
    const categories = useSelector((state) => state.category.categories);
    useEffect(() => {
        dispatch(getCategories());
    }, [dispatch]);
    return (
        <div className="home-section">
            <span className="home-header-title">Shop By Category</span>
            <div className="home-section-container">
                {categories &&
                    categories.map((category) => (
                        <NavLink
                            to={`/product/search?id=${category.name}`}
                            className="home-category-link"
                        >
                            <div className="home-category-image-container">
                                <img
                                    src={category.image}
                                    alt=""
                                    className="home-category-image"
                                />
                            </div>
                            <div
                                className="home-category-info"
                                style={{ textTransform: "capitalize" }}
                            >
                                {category.name.toLowerCase()}
                            </div>
                        </NavLink>
                    ))}
            </div>
        </div>
    );
}

export default ShopByCategory;
