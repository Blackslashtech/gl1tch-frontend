// src/SignIn.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // import useNavigate hook
import auth from './firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // navigation hook

  const handleSignIn = async (event) => {
    event.preventDefault();
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/'); // Navigate to home after successful login
    } catch (error) {
      setError(error.message);
    }
  };

  const handleRegister = () => {
    navigate('/signup'); // Navigate to SignUp page
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <h1>Sign In</h1>
      <form onSubmit={handleSignIn} style={{ display: 'flex', flexDirection: 'column', width: '300px' }}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} style={{ padding: '10px', marginBottom: '10px' }} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ padding: '10px', marginBottom: '10px' }} />
        <button type="submit" style={{ padding: '10px' }}>Sign In</button>
        <button type="button" onClick={handleRegister} style={{ padding: '10px', marginTop: '10px' }}>Register</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
};

export default SignIn;
