"use client";
import { FC } from 'react';
import { Link } from 'react-router-dom'; // Assuming you are using react-router-dom for routing
import './LandingPage.css'; // A separate CSS file for styling

const LandingPage: FC = () => {
  return (
    <div className="landing-container">
      <header className="landing-header">
        <img src="/path-to-your-logo.png" alt="GL1TCH" className="logo" />
        <Link to="/auth/login" className="login-link">Login</Link>
      </header>
      <section className="landing-main">
        <h1 className="main-title">Attack Defense.<br/>For Everyone.</h1>
        <div className="image-container">
          {/* Place your images here */}
        </div>
        <h2 className="secondary-title">Infrastructure.<br/>That just works.</h2>
        <p className="main-description">No more faulty checkers and broken NAT...</p>
        {/* Repeat for other sections */}
      </section>
      <footer className="landing-footer">
        {/* Footer content goes here */}
      </footer>
    </div>
  );
};

export default LandingPage;
