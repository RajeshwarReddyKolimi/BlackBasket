import React, { useState, useEffect } from "react";

function ResultPopup({ successMessage, errorMessage, setFunction }) {
    useEffect(() => {
        if (successMessage) {
            setTimeout(() => {
                if (setFunction) setFunction("");
            }, 3000);
        }

        if (errorMessage) {
            setTimeout(() => {
                if (setFunction) setFunction("");
            }, 3000);
        }
    }, [successMessage, errorMessage]);

    return (
        <div className="result-poup-container">
            {successMessage && (
                <div className="result-popup-slide-in result-popup-success">
                    {successMessage}
                </div>
            )}
            {errorMessage && (
                <div className="result-popup-failure">{errorMessage}</div>
            )}
        </div>
    );
}

export default ResultPopup;
