import React from "react";
import { PiMaskSadLight } from "react-icons/pi";
function Empty({ text }) {
    return (
        <div className="empty-icon-container">
            <PiMaskSadLight className="empty-icon" />
            {text}
        </div>
    );
}

export default Empty;
