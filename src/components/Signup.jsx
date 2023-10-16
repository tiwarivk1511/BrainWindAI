import React, { useState } from "react";
import "./Signup.css";
import logo from "../Assets/BrainWind AI.png";
import { AiOutlineUser, AiOutlineMail } from "react-icons/ai";
import { BsLock } from "react-icons/bs";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword } from "firebase/auth";
import { app, firestore } from "../firebase";
import { getFunctions, httpsCallable } from "firebase/functions";
import { Link, useNavigate } from "react-router-dom";

const auth = getAuth(app);
const functions = getFunctions(app);

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      // Step 1: Sign up the user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      // Step 2: Send OTP to the user's email using Firebase Cloud Functions
      const sendOTPFunction = httpsCallable(functions, "sendOTP");
      await sendOTPFunction({ email: userCredential.user.email });

      setIsOtpSent(true);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleVerifyOTP = async () => {
    try {
      // Step 3: Verify OTP entered by the user
      const verifyOTPFunction = httpsCallable(functions, "verifyOTP");
      const result = await verifyOTPFunction({ email, otp });

      if (result.data.success) {
        // OTP is valid, you can now set the user's email as verified
        await sendEmailVerification(auth.currentUser);

        // Optionally, sign in the user
        await signInWithEmailAndPassword(auth, email, password);

        // Redirect to the user's profile or dashboard
        setSuccessMsg(true);
        setSuccessMsg("Your Account Created Sucessfully");
        navigate("/BrainWindAI");
      } else {
        // Handle OTP verification failure
        setError("Invalid OTP");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="signup-container">
      <div className="content">
        <div className="logo-container">
          <img src={logo} alt="BrainWind AI Logo" className="logo" />
          <h1>BrainWind AI</h1>
        </div>
        <h2 className="signup-header">Sign Up</h2>
        <form className="signup-form">
          <div className="input-group">
            <AiOutlineUser className="icon" />
            <input
              type="text"
              placeholder="Username"
              name="username"
              className="input"
              required
            />
          </div>
          <div className="input-group">
            <AiOutlineMail className="icon" />
            <input
              type="email"
              placeholder="Email"
              name="email"
              className="input"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-group">
            <BsLock className="icon" />
            <input
              type="password"
              placeholder="Password"
              name="password"
              className="input"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {successMsg && (
            <p className="success-message">
              Your Account is created successfully.
            </p>
          )}
          {error && <p className="error-message">{error}</p>}

          {isOtpSent ? (
            <div className="input-group">
              <input
                type="text"
                placeholder="Enter OTP"
                name="otp"
                className="input"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
              <button
                type="button"
                onClick={handleVerifyOTP}
                className="verify-otp-button"
              >
                Verify OTP
              </button>
            </div>
          ) : (
            <button
              type="submit"
              onClick={handleSignup}
              className="signup-button"
            >
              Sign Up
            </button>
          )}
        </form>
        {/* Navigation Links */}
        <div className="navigation-links">
          Already have an account? <Link to="/">Login</Link>
        </div>
      </div>
    </div>
  );
}

export default Signup;
