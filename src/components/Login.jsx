import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import logo from "../Assets/BrainWind AI.png";
import { AiOutlineUser } from "react-icons/ai";
import { BsLock } from "react-icons/bs";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { app, auth as firebaseAuth, firestore } from "../firebase"; // Rename 'auth' import
// import { toast, ToastContainer } from "react-toastify";

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

function Login() {
  const [Email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Check if the user is already authenticated
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/"); // Redirect to MainScreen if authenticated
      } else {
       
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, Email, password);
      console.log("Login successful");
      // toast.success(
      //   "Account Login sucessful!!!",
      //   { autoClose: 3000 }
      // );
      navigate("/BrainWindAI");
    } catch (error) {
      console.error("Login error:", error.message);
      // toast.error(
      //   "",error.message,
      //   { autoClose: 3000 }
      // );
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      console.log("Google login successful");
      navigate("/BrainWindAI");
    } catch (error) {
      console.error("Google login error:", error);
    }
  };

  return (
    <div className="login-container">
      <div className="background-gradient"></div>
      <div className="content">
        <div className="logo-container">
          <img src={logo} alt="BrainWind AI Logo" className="logo" />
          <h1>BrainWind AI</h1>
          <h3>Login</h3>
        </div>
        <form className="login-form" onSubmit={handleLogin}>
          <div className="input-group">
            <AiOutlineUser className="icon" />
            <input
              type="email"
              placeholder="E-mail"
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-group">
            <BsLock className="icon" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="forgetTxt">
            <Link to="/forgetPassword">Forget Password ?</Link>
          </div>
          <button type="submit" className="login-button" onClick={handleLogin}>
            Log In
          </button>

          <div className="signupTxt">
            Don't have an account? <Link to="/Signup">Register</Link>
          </div>

          <div>------------------ OR -----------------------</div>
          <button className="button" onClick={handleGoogleLogin}>
            <img
              className="googleIcon"
              src="https://img.icons8.com/?size=96&id=V5cGWnc9R4xj&format=png"
              alt="Google"
            />
            Login With Google
          </button>
        </form>
      </div>
     
    </div>
  );
}

export default Login;
