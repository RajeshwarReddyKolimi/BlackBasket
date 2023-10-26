import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getUserById, getUsers } from "../../Redux/Thunks/adminThunks";
import AdminUserCard from "./AdminUserCard";

function AdminUsers() {
    const [userId, setUserId] = useState("");
    const dispatch = useDispatch();
    const usersData = useSelector((state) => state.admin.users);
    const curUser = useSelector((state) => state.admin.curUser);
    useEffect(() => {
        dispatch(getUsers());
    }, [dispatch]);

    function getUser(e) {
        e.preventDefault();
        dispatch(getUserById(userId));
    }
    return (
        <div>
            <h2>Users</h2>
            <form onSubmit={(e) => getUser(e)}>
                <input
                    type="text"
                    name="userId"
                    onChange={(e) => setUserId(e.target.value)}
                />
                <button>Get User</button>
            </form>
            {curUser && Object.keys(curUser).length !== 0 && (
                <AdminUserCard user={curUser} />
            )}
            <div className="container-sm w-50 d-flex flex-row flex-wrap">
                {usersData &&
                    usersData.map((user, key) => (
                        <AdminUserCard key={key} user={user} />
                    ))}
            </div>
        </div>
    );
}

export default AdminUsers;
