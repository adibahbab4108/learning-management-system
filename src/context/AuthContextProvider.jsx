/* eslint-disable no-unused-vars */
import { useState } from "react";
import AuthContext from "./AuthContext";
const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState({
        email: "adib123@gmail.com",
        name: "Adib Ahbab"
    })





    const authInfo = {
        user,
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;