import { useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth } from "../config/firebase.config";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

const backendUrl = import.meta.env.VITE_API_BASE_URL;
const provider = new GoogleAuthProvider();

const AuthContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const signInUsingGoogle = () => {
    return signInWithPopup(auth, provider);
  };
  const signUpUsingEmailAndPAssword = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const signInUsingEmailAndPAssword = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = async () => {
    try {
      //Telling the backend to clear the httpOnly cookie
      const { data } = await axios.post(
        `${backendUrl}/auth/sign-out`,
        {},
        {
          withCredentials: true, //sending the cookie for the server to clear it
        }
      );

      //  Sign out from the Firebase client
      await signOut(auth);
      setUser(null);
      setLoading(true);

      if (data.success) {
        toast.success(data.message);
      }
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.warn("Logout Failed");
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setLoading(false);
      } else {
        setUser(null);
        setLoading(true);
      }
    });
    return () => unsubscribe();
  }, []);

  const authInfo = {
    user,
    setUser,
    loading,
    setLoading,
    signInUsingGoogle,
    signUpUsingEmailAndPAssword,
    signInUsingEmailAndPAssword,
    logOut,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthContextProvider;
