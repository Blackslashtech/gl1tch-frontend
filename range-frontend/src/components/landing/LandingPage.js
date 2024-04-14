// LandingPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../firebaseConfig'; // Make sure this import points to your configured Firebase instance


const LandingPage = () => {
  const [emailForUpdates, setEmailForUpdates] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/signin');
  };

  const handleEmailChange = (e) => {
    setEmailForUpdates(e.target.value);
    setIsSubmitted(false); // Allow the user to sign up again
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await addDoc(collection(db, 'updates'), {
        email: emailForUpdates,
      });
      setIsSubmitted(true);
      setEmailForUpdates('');
    } catch (error) {
      console.error("Error adding document: ", error);
    }

    setIsSubmitting(false);
  };

  return (
    <div className="landing-page">
      <header className="header">
        <h1>GL1TCH</h1>
        <button onClick={handleLogin} className="login-button">Login</button>
      </header>
      <main className="main-content">
        <section className="hero-section">
          <h2>Attack Defense. For Everyone.</h2>
          <p>Infrastructure. That just works.</p>
          <p>No more faulty checkers and broken NAT. Spend more time breaking things you're supposed to break, and less time fixing the things you're not.</p>
        </section>
        <section className="deploy-section">
          <h3>Deploy anywhere. In minutes.</h3>
          <p>Run a full-blown attack-defense range from your laptop or use our cloud hosting to scale it to dozens of teams. If it can run Docker, it can run Glitch Range.</p>
        </section>
        <section className="model-section">
          {/* Self Hosted, Cloud Range, Onsite Support */}
        </section>
        <section className="updates-form-section">
          <form onSubmit={handleSubmit} className="updates-form">
            <input
              type="email"
              placeholder="Your email for updates"
              value={emailForUpdates}
              onChange={handleEmailChange}
              className="updates-input"
              disabled={isSubmitting}
            />
            <button type="submit" className="submit-button" disabled={isSubmitting}>
              {isSubmitted ? 'Submitted!' : 'Sign Up'}
            </button>
          </form>
          {isSubmitted && <p className="submission-message">Thanks for signing up! Check your inbox for updates.</p>}
        </section>
      </main>
      <footer className="footer">
        {/* Footer content goes here */}
      </footer>
    </div>
  );
};

export default LandingPage;
