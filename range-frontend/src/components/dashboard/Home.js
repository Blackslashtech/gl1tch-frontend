// src/Home.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import auth from '../../firebaseConfig';
import { signOut } from 'firebase/auth';

const Home = () => {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut(auth);
    navigate('/');  // Redirect to the landing page after signing out
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Welcome to the Home Page!</h1>
      <p>You are now signed in. Click below to sign out.</p>
      <button onClick={handleSignOut} style={{ padding: '10px' }}>Sign Out</button>
    </div>
  );
};

export default Home;
