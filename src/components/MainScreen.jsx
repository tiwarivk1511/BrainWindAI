import React from "react";
import ChatbotScreen from "./ChatScreen";
import SideNavigationMenu from "./SideNavigationMenu";

const MainScreen = () => {
  return (
    <div>
        <div>
            <SideNavigationMenu/>
        </div>
      <div>
        <ChatbotScreen />
      </div>
    </div>
  );
};

export default MainScreen;
