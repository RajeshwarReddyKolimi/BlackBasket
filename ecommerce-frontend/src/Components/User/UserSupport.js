import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { NavLink, Navigate } from "react-router-dom";
import "../../styles/product.css";
import { getUserDetails } from "../../Redux/Thunks/userThunks";
import Empty from "../Empty";

function UserSupport() {
    const dispatch = useDispatch();
    const isUserLogged = useSelector((state) => state.user.isUserLogged);
    const queries = useSelector((state) => state.user.userData.queries);
    useEffect(() => {
        dispatch(getUserDetails());
    }, [dispatch]);

    if (!isUserLogged) return <Navigate to="/" replace />;

    return (
        <div>
            <h2>Queries</h2>
            {queries && queries.length > 0 ? (
                <div className="products-container">
                    {queries.map((item, key) => (
                        <div key={key}>
                            <h5>{item && item.subject}</h5>
                            <div>{item && item.description} </div>
                        </div>
                    ))}
                </div>
            ) : (
                <Empty text="No queries" />
            )}
            <NavLink to="/user/support/create-query">Raise a query</NavLink>
        </div>
    );
}

export default UserSupport;
