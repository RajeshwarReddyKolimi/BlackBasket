import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    setErrorMessage,
    setSuccessMessage,
} from "../Redux/Reducers/globalSlice";

function ResultPopup() {
    const dispatch = useDispatch();
    const errorMessage = useSelector((state) => state.global.errorMessage);
    const successMessage = useSelector((state) => state.global.successMessage);
    useEffect(() => {
        if (successMessage) {
            setTimeout(() => {
                dispatch(setSuccessMessage(""));
            }, 3000);
        }

        if (errorMessage) {
            setTimeout(() => {
                dispatch(setErrorMessage(""));
            }, 3000);
        }
    }, [successMessage, errorMessage]);
    return (
        <div>
            <div className="result-poup-container">
                {successMessage && successMessage !== "" && (
                    <div className="result-popup-slide-in result-popup-success">
                        {successMessage}
                    </div>
                )}
                {errorMessage && errorMessage !== "" && (
                    <div className="result-popup-failure">{errorMessage}</div>
                )}
            </div>
        </div>
    );
}

export default ResultPopup;
