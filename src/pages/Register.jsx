/* eslint-disable no-unused-vars */
/* eslint-disable no-unreachable */
import React, { useContext, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router";
import AuthContext from "../context/AuthContext";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL;

const sendUserToBackend = async (user) => {
  const userData = {
    uid: user.uid,
    fullName: user.displayName || "Email User",
    email: user.email,
    photoURL: user.photoURL || null,
  };
  try {
    const { data } = await axios.post(
      `${API_URL}/user/google-login`,
      userData,
      {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
        withCredentials: true,
      }
    );
    console.log(data);
    return data;
  } catch (error) {
    console.error("❌ Backend Error:", error);
    return { message: "Something went wrong. Please try again later." };
  }
};

const Register = () => {
  const { setUser, signInUsingGoogle } = useContext(AuthContext);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [photo, setPhoto] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    return alert(
      "Please try with Google Login. This feature will be availabe soon!"
    );
    if (!email || !password) {
      setErrorMsg("Email and Password are required");
      return;
    }

    const newUser = {
      displayName: fullName || "New User",
      email,
      photoURL: photo || null,
    };

    try {
      await sendUserToBackend(newUser);
      navigate("/"); // redirect after success
    } catch (error) {
      setErrorMsg("Failed to register user.", error);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const { user } = await signInUsingGoogle();
      if (user) {
        setUser(user);
        const response = await sendUserToBackend(user);

        navigate("/");
      }
    } catch (error) {
      console.error(error);
      setErrorMsg("Google login failed.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-2xl font-bold text-center mb-6">
          Create an Account
        </h2>

        {errorMsg && (
          <div className="mb-4 text-red-600 text-sm text-center">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              className="w-full mt-1 px-4 py-2 border rounded-xl focus:border-none outline-none focus:ring-1 focus:ring-blue-500"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              className="w-full mt-1 px-4 py-2 border rounded-xl focus:border-none outline-none focus:ring-1 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              className="w-full mt-1 px-4 py-2 border rounded-xl focus:border-none outline-none focus:ring-1 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition"
          >
            Register
          </button>
        </form>

        <div className="flex items-center my-4">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-2 text-sm text-gray-500">OR</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-2 border border-gray-300 py-2 rounded-xl hover:bg-gray-100 transition"
        >
          <FcGoogle className="text-xl" />
          <span>Continue with Google</span>
        </button>
      </div>
    </div>
  );
};

export default Register;
