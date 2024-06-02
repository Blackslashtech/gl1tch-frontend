// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCOrEDkRXIlIFnoRo9xiHuzxZWF3GgQal8",
    authDomain: "glitch-frontend.firebaseapp.com",
    projectId: "glitch-frontend",
    storageBucket: "glitch-frontend.appspot.com",
    messagingSenderId: "675715521448",
    appId: "1:675715521448:web:3ef9dda4300a0f56365b9d",
    measurementId: "G-GBNTW7NZS7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

export { auth, firestore, analytics };
