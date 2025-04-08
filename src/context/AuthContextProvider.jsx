/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth } from "../config/firebase.config";

const provider = new GoogleAuthProvider();
const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    console.log(user)

    const signInUsingGoogle = () => {
        signInWithPopup(auth, provider)
    }
    const signUpUsingEmailAndPAssword = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const signInUsingEmailAndPAssword = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user)
                const uid = user.uid;
                // ...
            } else {
                // User is signed out
                // ...
            }
        });
    }, [])

    const authInfo = {
        user, setUser,
        signInUsingGoogle,
        signUpUsingEmailAndPAssword, signInUsingEmailAndPAssword,

    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;