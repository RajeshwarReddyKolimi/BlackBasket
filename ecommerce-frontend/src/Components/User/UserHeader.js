import React from "react";
import { NavLink } from "react-router-dom";
import UserNavSearch from "./UserNavSearch";
import "../../styles/navbar.css";
import { BsCart3, BsChevronDown } from "react-icons/bs";
import { FaRegUser } from "react-icons/fa";
import { AiOutlineDown, AiOutlineHeart } from "react-icons/ai";
function UserHeader() {
    return (
        <div className="navbar-buffer">
            <nav className="user-navbar">
                <NavLink to="/" className="nav-item">
                    <b>BlackBasket</b>
                </NavLink>
                <div className="navbar-category">
                    <li className="navbar-category-header nav-item">
                        Electronics
                        <BsChevronDown className="react-icon-small" />
                    </li>
                    <div className="navbar-category-dropdown">
                        <NavLink to="#">Mobiles</NavLink>
                        <NavLink to="#">Laptops</NavLink>
                        <NavLink to="#">Watches</NavLink>
                        <NavLink to="#">T-shirts</NavLink>
                        <NavLink to="#">Shirts</NavLink>
                        <NavLink to="#">Jeans</NavLink>
                        <NavLink to="#">Footwear</NavLink>
                    </div>
                </div>
                <div className="navbar-category">
                    <li className="navbar-category-header nav-item">
                        Men
                        <BsChevronDown className="react-icon-small" />
                    </li>
                    <div className="navbar-category-dropdown">
                        <NavLink to="#">TShirts</NavLink>
                        <NavLink to="#">Shirts</NavLink>
                        <NavLink to="#">Footwear</NavLink>
                        <NavLink to="#">Jeans</NavLink>
                        <NavLink to="#">Trousers</NavLink>
                        <NavLink to="#">Watches</NavLink>
                        <NavLink to="#">Accessories</NavLink>
                    </div>
                </div>
                <div className="navbar-category">
                    <li className="navbar-category-header nav-item">
                        Women
                        <BsChevronDown className="react-icon-small" />
                    </li>
                    <div className="navbar-category-dropdown">
                        <NavLink to="#">TShirts</NavLink>
                        <NavLink to="#">Shirts</NavLink>
                        <NavLink to="#">Footwear</NavLink>
                        <NavLink to="#">Jeans</NavLink>
                        <NavLink to="#">Trousers</NavLink>
                        <NavLink to="#">Watches</NavLink>
                        <NavLink to="#">Accessories</NavLink>
                    </div>
                </div>

                <div className="navbar-category">
                    <li className="navbar-category-header nav-item">
                        Appliances
                        <BsChevronDown className="react-icon-small" />
                    </li>
                    <div className="navbar-category-dropdown">
                        <NavLink to="#">TVs</NavLink>
                        <NavLink to="#">Refrigerators</NavLink>
                        <NavLink to="#">ACs</NavLink>
                        <NavLink to="#">Washing Machine</NavLink>
                        <NavLink to="#">Purifier</NavLink>
                        <NavLink to="#">Fans</NavLink>
                        <NavLink to="#">Air coolers</NavLink>
                    </div>
                </div>
                <div className="flex-buffer"></div>
                <UserNavSearch />
                <NavLink to="/user/cart" className="nav-item">
                    <div>
                        <BsCart3 className="react-icon" />
                        <div className="nav-list-count">
                            <span>1</span>
                        </div>
                    </div>
                </NavLink>
                <NavLink to="/user/wishlist" className="nav-item">
                    <div>
                        <AiOutlineHeart className="react-icon" />

                        <div className="nav-list-count">
                            <span>1</span>
                        </div>
                    </div>
                </NavLink>
                <NavLink to="/user/account" className="nav-item">
                    <div>
                        <FaRegUser className="react-icon" />
                    </div>
                </NavLink>
            </nav>
        </div>
    );
}

export default UserHeader;
