// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//! auth import
import { getAuth, GoogleAuthProvider } from "firebase/auth";
//! database import
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_API_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_API_PROJECT_ID,
  storageBucket: import.meta.env.VITE_API_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_API_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_API_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//! auth servisi kurulum
export const auth = getAuth(app);

//! google sağlayıcı kurulumu
export const provider = new GoogleAuthProvider();

//! firestore servisi kurulum
export const db = getFirestore(app);
