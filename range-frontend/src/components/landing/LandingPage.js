// src/LandingPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/signin');
  };

  const pageStyles = {
    backgroundColor: '#121212', // Dark background color
    color: 'white', // Text color
    fontFamily: 'Arial, sans-serif', // Font family
    minHeight: '100vh',
    position: 'relative'
  };

  const headerStyles = {
    padding: '20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  };

  const loginButtonStyle = {
    padding: '10px 20px',
    backgroundColor: '#0D7377', // Teal-like button color
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  };

  const mainContentStyles = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: 'calc(100vh - 60px)', // Adjust height based on header/footer size
    textAlign: 'center'
  };

  const placeholderImageStyle = {
    backgroundColor: '#333333', // Placeholder for images
    width: '80%',
    height: '200px',
    margin: '20px 0',
    borderRadius: '8px'
  };

  return (
    <div style={pageStyles}>
      <div style={headerStyles}>
        <h1>GL1TCH</h1>
        <button onClick={handleLogin} style={loginButtonStyle}>Login</button>
      </div>
      <div style={mainContentStyles}>
        <h2>Attack Defense. For Everyone.</h2>
        <div style={placeholderImageStyle}></div> {/* Placeholder for main image */}
        <p>Infrastructure. That just works.</p>
        <p>No more faulty checkers and broken NAT. Spend more time breaking things you're supposed to break, and less time fixing the things you're not.</p>
        {/* More content sections would follow here... */}
      </div>
      {/* Footer or additional content goes here */}
    </div>
  );
};

export default LandingPage;
