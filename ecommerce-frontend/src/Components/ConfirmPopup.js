import React from "react";
function ConfirmPopup({ action, text, setShowConfirmPopup }) {
    function cancel() {
        setShowConfirmPopup(false);
    }
    function confirm() {
        action();
        setShowConfirmPopup(false);
    }
    return (
        <div
            className="confirm-popup-overlay"
            onClick={(e) => {
                if (e.target.className !== "confirm-popup-overlay") return;
                setShowConfirmPopup(false);
            }}
        >
            <div className="confirm-popup">
                <div className="confirm-popup-text">{text}</div>
                <div className="button-container-flex">
                    <button onClick={cancel} className="button">
                        Cancel
                    </button>
                    <button onClick={confirm} className="button-danger">
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ConfirmPopup;
