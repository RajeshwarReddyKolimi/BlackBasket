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
            <ul className="footer-list flex-grow-2">
                <header className="footer-list-item footer-list-header">
                    Shop
                </header>
                <div className="footer-list-container">
                    {categories &&
                        categories.map((category, key) => (
                            <NavLink
                                key={key}
                                to={`/product/search?id=${category.name}`}
                                className="footer-list-item"
                            >
                                {category.name.toLowerCase()}
                            </NavLink>
                        ))}
                </div>
            </ul>

            <ul className="footer-list flex-grow-1">
                <header className="footer-list-item footer-list-header">
                    Account
                </header>
                <NavLink
                    to="/user/account/profile"
                    className="footer-list-item"
                >
                    Profile
                </NavLink>
                <NavLink to="#" className="footer-list-item">
                    Login and Security
                </NavLink>
                <NavLink to="/user/address" className="footer-list-item">
                    Address
                </NavLink>
                <NavLink to="/user/coupons" className="footer-list-item">
                    Coupons
                </NavLink>
                <NavLink to="/user/orders" className="footer-list-item">
                    Orders
                </NavLink>
                <NavLink to="/user/support" className="footer-list-item">
                    Help
                </NavLink>
            </ul>

            <ul className="footer-list flex-grow-1">
                <header className="footer-list-item footer-list-header">
                    Follow me
                </header>
                <NavLink
                    to="https://github.com/RajeshwarReddyKolimi"
                    className="footer-list-item"
                >
                    Github
                </NavLink>
                <NavLink
                    to="https://www.linkedin.com/in/rajeshwar-reddy-kolimi/"
                    className="footer-list-item"
                >
                    LinkedIn
                </NavLink>
                <NavLink
                    to="https://twitter.com/RajeshwarKolimi"
                    className="footer-list-item"
                >
                    Twitter
                </NavLink>
                <NavLink
                    to="https://www.instagram.com/rajeshwarreddykolimi/?utm_source=qr&igshid=MzNlNGNkZWQ4Mg%3D%3D"
                    className="footer-list-item"
                >
                    Instagram
                </NavLink>
                <NavLink
                    to="https://portfolio-rajeshwar.netlify.app/"
                    className="footer-list-item"
                >
                    Portfolio
                </NavLink>
            </ul>
        </footer>
    );
}

export default UserFooter;
