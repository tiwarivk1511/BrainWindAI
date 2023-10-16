import React from "react";
import { BrowserRouter as Router, Route, Link, Routes  } from "react-router-dom";

import Login from "./components/Login";
import Signup from "./components/Signup";
import ForgotPassword from "./components/ForgetPass";
import MainScreen from "./components/MainScreen";

function App() {
  return (
    <Router>
    <nav style={{ display: "none" }}>
      <ul>
        <li>
          <Link to="/BrainWindAI">Home</Link>
        </li>
        <li>
          <Link to="/signup">Signup</Link>
        </li>
        <li>
          <Link to="/forgetPassword">Forget Password</Link>
        </li>
        <li>
          <Link to="/">Main</Link>
        </li>
      </ul>
    </nav>
    
    <Routes>
      <Route path="/BrainWindAI" element={<MainScreen/>} />
      <Route path="/" element={<Login/>} />
      <Route path="/signup" element={<Signup/>} />
      <Route path="/forgetPassword" element={<ForgotPassword/>} />
    </Routes>
  </Router>
  );
}

export default App;
