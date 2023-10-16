import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import './ForgetPass.css'; // Import your CSS file
import logo from '../Assets/BrainWind AI.png';
import {AiOutlineMail } from "react-icons/ai";
import { getAuth, sendPasswordResetEmail } from 'firebase/auth'; // Import Firebase authentication functions
import { app } from '../firebase'; // Import your Firebase configuration

const auth = getAuth(app);

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [resetSuccess, setResetSuccess] = useState(false);
  const [resetError, setResetError] = useState(null);

  const handleResetPassword = async (e) => {
    e.preventDefault();

    try {
      // Send a password reset email to the user's email
      await sendPasswordResetEmail(auth, email);
      setResetSuccess(true);
      setResetError(null);
    } catch (error) {
      setResetSuccess(false);
      setResetError(error.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="background-gradient"></div>
      <div className="content">
        <div className="logo-container">
          <img src={logo} alt="BrainWind AI Logo" className="logo" />
          <h1>BrainWind AI</h1>
        </div>
        <form className="auth-form" onSubmit={handleResetPassword}>
          <h2>Forgot Password</h2>
          {resetSuccess && (
            <p className="success-message">
              Password reset email sent. Check your inbox.
            </p>
          )}
          {resetError && (
            <p className="error-message">{resetError}</p>
          )}
          <div className="input-group">
            <AiOutlineMail className='icon'/>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button type="submit" className="auth-button">
            Reset Password
          </button>
          <div className="back-to-login">
            <Link to="/">Back to Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
