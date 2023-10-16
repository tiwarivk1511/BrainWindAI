import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ChatScreen.css";
import logo from "../Assets/BrainWind AI.png";
import SideNavigationMenu from "./SideNavigationMenu";
import { BsMenuAppFill } from "react-icons/bs";

const ChatbotScreen = () => {
 

  return (
    <div>
      <SideNavigationMenu/>
      <div className="chatbot-screen">
        <div className="chat-container">
          <div className="chat-header">
            <BsMenuAppFill />
            <img src={logo} alt="BrainWind AI Logo" className="logo" />
          </div>
          <div className="chat-window" id="chat-window">
            {/* messages will show here */}
          </div>
          <div className="input-container">
            <input type="text" placeholder="Type a message..." />
            <button>Send</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatbotScreen;
