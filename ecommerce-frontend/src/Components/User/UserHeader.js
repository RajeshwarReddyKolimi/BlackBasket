import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import UserNavSearch from "./UserNavSearch";
import "../../styles/navbar.css";
import { BsCart3, BsChevronDown } from "react-icons/bs";
import { BiBookmark } from "react-icons/bi";
import { GoHome } from "react-icons/go";
import { FaRegUser } from "react-icons/fa";
import { MdLightMode, MdModeNight } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { getCart, getUserDetails } from "../../Redux/Thunks/userThunks";
import { getCategories } from "../../Redux/Thunks/categoryThunks";
import { AiOutlineAppstore } from "react-icons/ai";
function UserHeader() {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const [darkTheme, setDarkTheme] = useState(false);
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
                <NavLink
                    to="/"
                    className="nav-item"
                    onClick={() => setShowMenu(false)}
                >
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
                        className="nav-item navbar-header nav-item-home-left"
                        onClick={() => setShowMenu(false)}
                    >
                        Home
                    </NavLink>
                    <div className="navbar-category nav-item-left">
                        <li className="navbar-header nav-item">
                            Categories
                            <BsChevronDown className="react-icon-small" />
                        </li>
                        <div className="navbar-category-dropdown">
                            {categories &&
                                categories.map((category, key) => (
                                    <NavLink
                                        key={key}
                                        to={`/product/search?id=${category.name}`}
                                        className="navbar-category-dropdown-item"
                                        onClick={() => setShowMenu(false)}
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
                            <div
                                className={`nav-item-category-buffer ${
                                    showMenu && "nav-item-category-buffer-show"
                                }`}
                            ></div>
                        </div>
                    </div>
                    <NavLink
                        to="/user/support"
                        className="nav-item navbar-header nav-item-left nav-item-home-left"
                        onClick={() => setShowMenu(false)}
                    >
                        Help
                    </NavLink>
                </div>

                <div className="flex-buffer"></div>
                <div className="nav-item" onClick={() => setShowMenu(false)}>
                    <UserNavSearch />
                </div>
                <button
                    onClick={() => {
                        setDarkTheme((prev) => !prev);
                        document.body.classList.toggle("dark-theme");
                    }}
                >
                    {darkTheme ? (
                        <MdModeNight className="react-icon" />
                    ) : (
                        <MdLightMode className="react-icon" />
                    )}
                    <div className="nav-item-title">Theme</div>
                </button>
                <div className={`nav-item-right-container`}>
                    <NavLink
                        to="/"
                        className="nav-item-home-right nav-item-right"
                        onClick={() => setShowMenu(false)}
                    >
                        <GoHome className="react-icon" />

                        <div className="nav-item-title">Home</div>
                    </NavLink>
                    <NavLink
                        to="/user/cart"
                        className="nav-item nav-item-right"
                        onClick={() => setShowMenu(false)}
                    >
                        <div className="nav-list-count-container">
                            <div className="nav-list-count">
                                {isUserLogged ? cartSize : 0}
                            </div>
                            <BsCart3 className="react-icon" />
                        </div>
                        <div className="nav-item-title">Cart</div>
                    </NavLink>
                    <NavLink
                        to="/user/wishlist"
                        className="nav-item nav-item-right"
                        onClick={() => setShowMenu(false)}
                    >
                        <div className="nav-list-count-container">
                            <div className="nav-list-count">
                                {isUserLogged && userData && userData.wishlist
                                    ? userData.wishlist.length
                                    : 0}
                            </div>
                            <BiBookmark className="react-icon" />
                        </div>
                        <div className="nav-item-title">Saved</div>
                    </NavLink>
                    <NavLink
                        to="/user/account"
                        className="nav-item nav-item-right"
                        onClick={() => setShowMenu(false)}
                    >
                        <FaRegUser className="react-icon" />
                        <div className="nav-item-title">Account</div>
                    </NavLink>
                    <button
                        className="nav-item nav-item-right nav-menu"
                        onClick={() => setShowMenu((prev) => !prev)}
                    >
                        <AiOutlineAppstore className="react-icon" />
                        <div className="nav-item-title">Category</div>
                    </button>
                </div>
            </nav>
        </div>
    );
}

export default UserHeader;
