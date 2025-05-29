// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBkL9rQ2mX8vK3nP7wE5tA6uY9sD2fH8jK",
    authDomain: "challenge11-auth-app.firebaseapp.com",
    databaseURL: "https://challenge11-auth-app-default-rtdb.firebaseio.com",
    projectId: "challenge11-auth-app",
    storageBucket: "challenge11-auth-app.appspot.com",
    messagingSenderId: "847291635729",
    appId: "1:847291635729:web:c4b8f2e1a9d7e6f3a5b8c9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// Initialize Realtime Database and get a reference to the service
export const realtimeDb = getDatabase(app);

// Initialize Google Auth Provider
export const googleProvider = new GoogleAuthProvider();

export default app; 