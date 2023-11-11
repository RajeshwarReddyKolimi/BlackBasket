import React, { useEffect, useState } from "react";
import { NavLink, Navigate } from "react-router-dom";
import UserNavSearch from "./UserNavSearch";
import "../../styles/navbar.css";
import { BsCart3, BsChevronDown } from "react-icons/bs";
import { BiMenu } from "react-icons/bi";
import { GoHome } from "react-icons/go";
import { FaRegUser } from "react-icons/fa";
import { AiOutlineDown, AiOutlineHeart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { getCart, getUserDetails } from "../../Redux/Thunks/userThunks";
import { getCategories } from "../../Redux/Thunks/categoryThunks";
function UserHeader() {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const isUserLogged = useSelector((state) => state.user.isUserLogged);
    const userData = useSelector((state) => state.user.userData);
    const categories = useSelector((state) => state.category.categories);
    const cartSize = useSelector((state) => {
        return state.user &&
            state.user.userData &&
            state.user.userData.cart &&
            state.user.userData.cart.items
            ? state.user.userData.cart.items.length
            : 0;
    });
    useEffect(() => {
        dispatch(getUserDetails());
        dispatch(getCart());
        dispatch(getCategories());
    }, [dispatch]);
    return (
        <div className="navbar-buffer">
            <nav className="user-navbar">
                <NavLink to="/" className="nav-item">
                    <div className="logo">
                        Black
                        <br />
                        Basket
                    </div>
                </NavLink>
                <div
                    className={`${
                        showMenu
                            ? "nav-menu-container"
                            : "nav-item-left-container"
                    }`}
                >
                    <NavLink
                        to="/"
                        className="nav-item navbar-category-header nav-item-home-left"
                    >
                        Home
                    </NavLink>
                    <div className="navbar-category nav-item-left">
                        <li className="navbar-category-header nav-item">
                            Categories
                            <BsChevronDown className="react-icon-small" />
                        </li>
                        <div className="navbar-category-dropdown">
                            {categories &&
                                categories.map((category) => (
                                    <NavLink
                                        to={`/product/search?id=${category.name}`}
                                        className="navbar-category-dropdown-item"
                                    >
                                        <img
                                            src={category.image}
                                            alt=""
                                            className="navbar-category-image"
                                        />
                                        <div
                                            style={{
                                                textTransform: "capitalize",
                                            }}
                                        >
                                            {category.name.toLowerCase()}
                                        </div>
                                    </NavLink>
                                ))}
                        </div>
                    </div>
                    <NavLink
                        to="/user/support"
                        className="nav-item navbar-category-header nav-item-left nav-item-home-left"
                    >
                        Help
                    </NavLink>
                </div>

                <div className="flex-buffer"></div>
                <UserNavSearch />
                <div className={`nav-item-right-container`}>
                    <NavLink
                        to="/"
                        className="nav-item-home-right nav-item-right"
                    >
                        <GoHome className="react-icon" />
                    </NavLink>
                    <NavLink
                        to="/user/cart"
                        className="nav-item nav-item-right"
                    >
                        <div>
                            <BsCart3 className="react-icon" />
                            <div className="nav-list-count">
                                <span>{isUserLogged ? cartSize : 0}</span>
                            </div>
                        </div>
                    </NavLink>
                    <NavLink
                        to="/user/wishlist"
                        className="nav-item nav-item-right"
                    >
                        <div>
                            <AiOutlineHeart className="react-icon" />

                            <div className="nav-list-count">
                                <span>
                                    {isUserLogged &&
                                    userData &&
                                    userData.wishlist
                                        ? userData.wishlist.length
                                        : 0}
                                </span>
                            </div>
                        </div>
                    </NavLink>
                    <NavLink
                        to="/user/account"
                        className="nav-item nav-item-right"
                    >
                        <div>
                            <FaRegUser className="react-icon" />
                        </div>
                    </NavLink>
                    <button
                        className="nav-item nav-menu"
                        onClick={() => setShowMenu((prev) => !prev)}
                    >
                        <BiMenu className="react-icon" />
                    </button>
                </div>
            </nav>
        </div>
    );
}

export default UserHeader;
