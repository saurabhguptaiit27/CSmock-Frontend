// AuthProvider.js
import React, { createContext, useState } from "react";

// Create a context
export const BookingConfirmationContext = createContext();

// Provider component
export const BookingConfirmationProvider = ({ children }) => {
    const [currentExpertData, setCurrentExpertData] = useState([]);


  return (
    <BookingConfirmationContext.Provider
      value={{
        currentExpertData,
        setCurrentExpertData,
      }}
    >
      {children}
    </BookingConfirmationContext.Provider>
  );
};
