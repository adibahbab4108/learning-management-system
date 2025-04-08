import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const Login = () => {
    const {signUpUsingGoogle} =useContext(AuthContext)
    return (
        <div>
            <button onClick={signUpUsingGoogle()}>Login</button>
        </div>
    );
};

export default Login;