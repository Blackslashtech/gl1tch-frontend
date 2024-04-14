// src/SignIn.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import auth from '../../firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignIn = async (event) => {
    event.preventDefault();
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/home'); // Make sure to navigate to the correct home route
    } catch (error) {
      setError(error.message);
    }
  };

  const handleRegister = () => {
    navigate('/signup');
  };

  const handleBack = () => {
    navigate('/'); // Navigate back to the landing page
  };

  return (
    <div style={{ position: 'relative', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <button onClick={handleBack} style={{ position: 'absolute', top: '20px', left: '20px', padding: '10px' }}>Back</button>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h1>Sign In</h1>
        <form onSubmit={handleSignIn} style={{ display: 'flex', flexDirection: 'column', width: '300px' }}>
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} style={{ padding: '10px', marginBottom: '10px' }} />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ padding: '10px', marginBottom: '10px' }} />
          <button type="submit" style={{ padding: '10px' }}>Sign In</button>
          <button type="button" onClick={handleRegister} style={{ padding: '10px', marginTop: '10px' }}>Register</button>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default SignIn;
