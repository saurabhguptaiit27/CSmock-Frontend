// AuthProvider.js
import React, { createContext, useState } from "react";

// Create a context
export const SelectedButtonContext = createContext();

// Provider component
export const SelectedButtonProvider = ({ children }) => {
  const [selectedButton, setSelectedButton] = useState("User");
  const handleButtonClick = (button) => {
    setSelectedButton(button);
  };

  return (
    <SelectedButtonContext.Provider
      value={{
        selectedButton,
        setSelectedButton,
        handleButtonClick,
      }}
    >
      {children}
    </SelectedButtonContext.Provider>
  );
};
