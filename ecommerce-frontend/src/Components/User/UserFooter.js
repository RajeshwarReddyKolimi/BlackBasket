import React, { useEffect } from "react";
import "../../styles/footer.css";
import { NavLink } from "react-router-dom";
import { getCategories } from "../../Redux/Thunks/categoryThunks";
import { useDispatch, useSelector } from "react-redux";
function UserFooter() {
    const dispatch = useDispatch();
    const categories = useSelector((state) => state.category.categories);

    useEffect(() => {
        dispatch(getCategories());
    }, [dispatch]);
    return (
        <footer className="footer">
            <ul className="footer-list flex-buffer">
                <header className="footer-list-item footer-list-header">
                    Shop
                </header>
                <div className="footer-list-container">
                    {categories &&
                        categories.map((category) => (
                            <NavLink
                                to={`/product/search?id=${category.name}`}
                                className="footer-list-item"
                            >
                                {category.name.toLowerCase()}
                            </NavLink>
                        ))}
                </div>
            </ul>

            <ul className="footer-list">
                <header className="footer-list-item footer-list-header">
                    Account
                </header>
                <NavLink to="#" className="footer-list-item">
                    Profile
                </NavLink>
                <NavLink to="#" className="footer-list-item">
                    Login and Security
                </NavLink>
                <NavLink to="#" className="footer-list-item">
                    Address
                </NavLink>
                <NavLink to="#" className="footer-list-item">
                    Coupons
                </NavLink>
                <NavLink to="#" className="footer-list-item">
                    Orders
                </NavLink>
                <NavLink to="#" className="footer-list-item">
                    Help
                </NavLink>
            </ul>

            <ul className="footer-list">
                <header className="footer-list-item footer-list-header">
                    Follow
                </header>
                <NavLink to="#" className="footer-list-item">
                    Twitter
                </NavLink>
                <NavLink to="#" className="footer-list-item">
                    Github
                </NavLink>
                <NavLink to="#" className="footer-list-item">
                    Instagram
                </NavLink>
                <NavLink to="#" className="footer-list-item">
                    LinkedIn
                </NavLink>
            </ul>
        </footer>
    );
}

export default UserFooter;
