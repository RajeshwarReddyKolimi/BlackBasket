import React from "react";
function confirmPopup({ action, setShowPopup }) {
    function cancel() {
        setShowPopup(false);
    }
    function confirm() {
        action();
        setShowPopup(false);
    }
    return (
        <div className="confirm-popup">
            Are you sure?
            <div className="button-container-flex">
                <button onClick={cancel} className="button-1">
                    Cancel
                </button>
                <button onClick={confirm} className="button-danger-1">
                    Confirm
                </button>
            </div>
        </div>
    );
}

export default confirmPopup;
