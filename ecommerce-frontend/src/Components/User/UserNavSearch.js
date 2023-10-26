import React from "react";
import "../../styles/navbar.css";
import { AiOutlineSearch } from "react-icons/ai";
function UserNavSearch() {
    return (
        <form className="search-form">
            <input
                type="text"
                name="search-input"
                className="search-input"
                placeholder="Search Products"
            />
            <button className="search-button">
                <AiOutlineSearch className="react-icon search-icon" />
            </button>
        </form>
    );
}

export default UserNavSearch;
