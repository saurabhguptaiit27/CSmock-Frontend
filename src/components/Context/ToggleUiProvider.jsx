// ToggleUIProvider.jsx
import React, { createContext, useContext, useState } from "react";
import { AuthContext } from "./AuthProvider";

// Create a context
export const ToggleUIContext = createContext();

// Provider component
export const ToggleUIProvider = ({ children }) => {
  const { userType } = useContext(AuthContext);
  const [isAvailabilityUI, setIsAvailabilityUI] = useState(false);

  const getCookie = (name) => {
    const cookies = document.cookie.split("; ");

    const cookie = cookies.find((cookie) => cookie.startsWith(name + "="));

    return cookie ? cookie.split("=")[1] : null;
  };

  const handleAddAvailabilityButton = async () => {
    setIsAvailabilityUI(true);
    const response = await fetch(
      userType === "Expert" &&
        `https://csmock-backend.onrender.com/api/v1/experts/current-expert?encryptionsecret=${getCookie(
          "accessToken"
        )}`,
      {
        method: "GET",
        credentials: "include",
      }
    );
    const data = await response.json();
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
