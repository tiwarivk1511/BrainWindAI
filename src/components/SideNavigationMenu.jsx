import React, { useState } from "react";
import "./SideNavigationMenu.css";
import { app, auth as firebaseAuth, firestore } from "../firebase"; // Rename 'auth' import
import { Link, useNavigate } from "react-router-dom"; // Import Link from react-router-dom


function SideNavigationMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    try {
      await app.auth().signOut();
      // Redirect or perform any other action after logout.
      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className={`side-navigation-menu ${isOpen ? "open" : ""}`}>
      <button className="toggle-button" onClick={toggleMenu}>
        {isOpen ? "Close Menu" : "Open Menu"}
      </button>
      <nav className="menu">
        <ul>
          <li>User Profile</li>
          <li>Developer Profile</li>
          <li onClick={handleLogout}><Link to="/">Log out</Link></li>
          {/* Add more menu items as needed */}
        </ul>
      </nav>
    </div>
  );
}

export default SideNavigationMenu;
