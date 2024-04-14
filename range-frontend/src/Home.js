// src/Home.js
import React from 'react';
import auth from './firebaseConfig';
import { signOut } from 'firebase/auth';

const Home = () => {
  const handleSignOut = async () => {
    await signOut(auth);
    alert('Signed out!');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <h1>Welcome Home!</h1>
      <button onClick={handleSignOut} style={{ padding: '10px' }}>Sign Out</button>
    </div>
  );
};

export default Home;
