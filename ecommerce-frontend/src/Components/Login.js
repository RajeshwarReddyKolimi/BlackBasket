import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../Redux/Thunks/userThunks";
function Login(props) {
    const dispatch = useDispatch();
    const errorMessage = useSelector((state) => state.user.errorMessage);
    async function handleClick(e) {
        e.preventDefault();
        const password = document.getElementsByName("password")[0].value;
        const email = document.getElementsByName("email")[0].value;
        dispatch(userLogin({ email, password }));
    }
    return (
        <div>
            <form onSubmit={(e) => handleClick(e)} method="post">
                <input type="text" name="email" />
                <input type="text" name="password" />
                <button>Login</button>
            </form>
            <h2>{errorMessage}</h2>
        </div>
    );
}

export default Login;
