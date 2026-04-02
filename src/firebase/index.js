// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//! auth import
import { getAuth, GoogleAuthProvider } from "firebase/auth";
//! database import
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDzef5Auc-5DLNS8s21jLjA_5alYyxcKEg",
  authDomain: "chat-app-ae6c1.firebaseapp.com",
  projectId: "chat-app-ae6c1",
  storageBucket: "chat-app-ae6c1.firebasestorage.app",
  messagingSenderId: "364400033540",
  appId: "1:364400033540:web:716c88036e77a8caea9a51",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//! auth servisi kurulum
export const auth = getAuth(app);

//! google sağlayıcı kurulumu
export const provider = new GoogleAuthProvider();

//! firestore servisi kurulum
export const db = getFirestore(app);
