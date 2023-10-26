import React from "react";
import "../../styles/footer.css";
import { NavLink } from "react-router-dom";
function UserFooter() {
    return (
        <footer className="footer">
            <ul className="footer-list">
                <header className="footer-list-item footer-list-header">
                    Shop
                </header>
                <NavLink to="#" className="footer-list-item">
                    Men
                </NavLink>
                <NavLink to="#" className="footer-list-item">
                    Women
                </NavLink>
                <NavLink to="#" className="footer-list-item">
                    Electronics
                </NavLink>
                <NavLink to="#" className="footer-list-item">
                    Kids
                </NavLink>
                <NavLink to="#" className="footer-list-item">
                    Appliances
                </NavLink>
                <NavLink to="#" className="footer-list-item">
                    Home and Kitchen
                </NavLink>
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
