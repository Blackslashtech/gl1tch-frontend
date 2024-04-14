// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './components/landing/LandingPage';
import SignUp from './components/auth/SignUp';
import SignIn from './components/auth/SignIn';
import Home from './components/dashboard/Home';
import auth from './firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
// In your App.js or the relevant component file
import './App.css';


const App = () => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={currentUser ? <Navigate to="/" /> : <SignUp />} />
        <Route path="/signin" element={currentUser ? <Navigate to="/" /> : <SignIn />} />
        <Route path="/home" element={currentUser ? <Home /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
