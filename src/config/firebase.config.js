// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBB1xEMGX6KoAxup5B_qq_KBvSY5GcB6o4",
  authDomain: "learning-management-syst-430aa.firebaseapp.com",
  projectId: "learning-management-syst-430aa",
  storageBucket: "learning-management-syst-430aa.firebasestorage.app",
  messagingSenderId: "644216665668",
  appId: "1:644216665668:web:4757a8c843b6e176b96e11"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);