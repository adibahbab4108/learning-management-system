/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "../config/firebase.config";

const provider = new GoogleAuthProvider();
const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    console.log(user)

    const signInUsingGoogle = () => {
        return signInWithPopup(auth, provider)
    }
    const signUpUsingEmailAndPAssword = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const signInUsingEmailAndPAssword = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }
    const logOut = async () => {
        try {
            await signOut(auth);
            setUser(null);
            alert("Logout successful");
        } catch (error) {
            alert("Something wrong")
            console.error("Logout Error:", error.message);
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user)
            } else {
                setUser(null)
            }
        });
        return () => unsubscribe();
    }, [])

    const authInfo = {
        user, setUser,
        signInUsingGoogle,
        signUpUsingEmailAndPAssword, signInUsingEmailAndPAssword,
        logOut,

    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;