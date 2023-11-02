import React, { useState, useEffect } from "react";

function ResultPopup({ successMessage, errorMessage }) {
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);

    useEffect(() => {
        if (successMessage) {
            setShowSuccess(true);

            setTimeout(() => {
                setShowSuccess(false);
            }, 3000);
        }

        if (errorMessage) {
            setShowError(true);

            setTimeout(() => {
                setShowError(false);
            }, 3000);
        }
    }, [successMessage, errorMessage]);

    return (
        <div className="result-poup-container">
            {showSuccess && (
                <div className="result-popup-slide-in result-popup-success">
                    {successMessage}
                </div>
            )}
            {showError && (
                <div className="result-popup-failure">{errorMessage}</div>
            )}
        </div>
    );
}

export default ResultPopup;
