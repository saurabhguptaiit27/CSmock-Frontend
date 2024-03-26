// ToggleUIProvider.jsx
import React, { createContext, useContext, useState } from "react";
import { AuthContext } from "./AuthProvider";

// Create a context
export const ToggleUIContext = createContext();

// Provider component
export const ToggleUIProvider = ({ children }) => {
  const { userType } = useContext(AuthContext);
  const [isAvailabilityUI, setIsAvailabilityUI] = useState(false);
  const [initialPara, setInitialPara] = useState(
    "You have not saved any available dates yet"
  );

  const handleAddAvailabilityButton = async () => {
    setIsAvailabilityUI(true);
    const response = await fetch(
      userType === "Expert" && "/api/v1/experts/current-expert",
      {
        method: "GET",
        credentials: "include",
      }
    );
    const data = await response.json();
    if (data["data"]["availability"].length !== 0) {
      setInitialPara("Your Availability is saved and will be shown to users");
    } else {
      setInitialPara("You have not saved any available dates yet");
    }
  };
  const handleCrossAvailabilityButton = () => {
    setIsAvailabilityUI(false);
  };

  const [toggleProfile, setToggleProfile] = useState(false);
  const [toggleMenu, setToggleMenu] = useState(false);
  const handleToggleProfile = () => {
    setToggleProfile(!toggleProfile);
  };
  const handleToggleMenu = () => {
    setToggleMenu(!toggleMenu);
  };

  const [toggleChat, setToggleChat] = useState(false);
  const handleToggleChat = () => {
    setToggleChat(!toggleChat);
  };

  return (
    <ToggleUIContext.Provider
      value={{
        isAvailabilityUI,
        setIsAvailabilityUI,
        handleAddAvailabilityButton,
        initialPara,
        setInitialPara,
        handleCrossAvailabilityButton,
        toggleProfile,
        setToggleProfile,
        handleToggleProfile,
        toggleMenu,
        setToggleMenu,
        handleToggleMenu,
        toggleChat,
        setToggleChat,
        handleToggleChat,
      }}
    >
      {children}
    </ToggleUIContext.Provider>
  );
};
