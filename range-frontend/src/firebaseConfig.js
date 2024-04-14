// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCO2_2A-i-Q0xaAZkgzaL9ITLrNbBgg7Is",
  authDomain: "gl1tch-5105a.firebaseapp.com",
  projectId: "gl1tch-5105a",
  storageBucket: "gl1tch-5105a.appspot.com",
  messagingSenderId: "365265350057",
  appId: "1:365265350057:web:27569c33df8f2f6eb7a8b8",
  measurementId: "G-Z2WHDWG1WB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export default auth;