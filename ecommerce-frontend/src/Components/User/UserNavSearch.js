import React, { useEffect, useState } from "react";
import "../../styles/navbar.css";
import { AiOutlineSearch } from "react-icons/ai";
import {
    Navigate,
    useLocation,
    useNavigate,
    useSearchParams,
} from "react-router-dom";
function UserNavSearch() {
    const [searchValue, setSearchValue] = useState("");
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const location = useLocation();
    useEffect(() => {
        const queryId = searchParams.get("id");
        setSearchValue(queryId || "");
    }, [location.search]);
    function handleSearch(e) {
        e.preventDefault();
        setSearchParams({ id: searchValue });
        navigate(`/product/search?id=${searchValue}`);
    }
    return (
        <form className="search-form" onSubmit={(e) => handleSearch(e)}>
            <input
                type="text"
                name="search-input"
                className="search-input"
                placeholder="Search Products"
                onChange={(e) => {
                    setSearchValue(e.target.value);
                }}
                value={searchValue}
            />
            <button className="search-button" onClick={(e) => handleSearch(e)}>
                <AiOutlineSearch className="react-icon search-icon" />
            </button>
        </form>
    );
}

export default UserNavSearch;
