import React, { useEffect } from "react";
import Home from "./Home";

function Payment() {
    useEffect(() => {
        setTimeout(() => {
            alert("Redirecting");
        }, 3000);
    }, []);
    return <div>Payment Successful</div>;
}

export default Payment;
