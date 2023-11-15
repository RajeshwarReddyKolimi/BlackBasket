import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { NavLink, Navigate } from "react-router-dom";
import "../../styles/query.css";
import { getUserDetails } from "../../Redux/Thunks/userThunks";
import Empty from "../Empty";

function UserSupport() {
    const dispatch = useDispatch();
    const isUserLogged = useSelector((state) => state.user.isUserLogged);
    const queries = useSelector((state) => state.user.userData.queries);
    useEffect(() => {
        dispatch(getUserDetails());
    }, [dispatch]);

    if (!isUserLogged) return <Navigate to="/user/login" replace />;

    return (
        <div className="section">
            <div className="section-header">
                <div className="header-title">Queries</div>
            </div>
            {queries && queries.length > 0 ? (
                <div className="query-container">
                    {queries.map((item, key) => (
                        <div className="query-card" key={key}>
                            <div className="query-title">
                                {item.query && item.query.subject}
                            </div>
                            <div className={`query-status `}>
                                {item.query && item.query.status}
                            </div>
                            <div className="query-info">
                                {item.query && item.query.description}{" "}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <Empty text="No queries" />
            )}
            <NavLink to="/user/support/create-query" className="button">
                Raise a query
            </NavLink>
        </div>
    );
}

export default UserSupport;
