import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getUserById, getUsers } from "../../Redux/Thunks/adminThunks";
import AdminUserCard from "./AdminUserCard";
import { setErrorMessage } from "../../Redux/Reducers/globalSlice";
import axios from "axios";
import apiUrl from "../../apiUrl";
import "../../styles/adminUser.css";
function AdminUsers() {
    const [userId, setUserId] = useState("");
    const [searchedUser, setSearchedUser] = useState();
    const dispatch = useDispatch();
    const usersData = useSelector((state) => state.admin.users);

    useEffect(() => {
        dispatch(getUsers());
    }, [dispatch]);
    async function getUserById(e) {
        e.preventDefault();
        try {
            const response = await axios.get(`${apiUrl}/admin/user/${userId}`, {
                withCredentials: true,
            });
            setSearchedUser(response.data);
        } catch (error) {
            dispatch(setErrorMessage(error.response.data.message));
            console.error(error.message);
        }
    }
    return (
        <div className="section">
            <div className="section-header">
                <div className="header-title">Users</div>
            </div>
            <div className="search-product-id">
                <form
                    onSubmit={(e) => getUserById(e)}
                    className="button-container"
                >
                    <input
                        type="text"
                        className="form-input"
                        onChange={(e) => {
                            setSearchedUser(null);
                            setUserId(e.target.value);
                        }}
                        placeholder="Search by Id"
                    ></input>
                    <button
                        type="submit"
                        className="button-inverse"
                        onClick={(e) => getUserById(e)}
                    >
                        Search
                    </button>
                </form>
                {searchedUser && (
                    <div className="admin-users-container">
                        <AdminUserCard user={searchedUser} />
                    </div>
                )}
            </div>
            <div className="admin-users-container">
                {usersData &&
                    usersData.map((user, key) => (
                        <AdminUserCard key={key} user={user} />
                    ))}
            </div>
        </div>
    );
}

export default AdminUsers;
