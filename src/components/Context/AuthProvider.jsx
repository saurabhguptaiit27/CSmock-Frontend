// AuthProvider.js
import React, { createContext, useState, useEffect } from "react";

// Create a context
export const AuthContext = createContext();

// Provider component
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState("User");

  useEffect(() => {
    const checkLoggedInStatus = () => {
      const authCookie = document.cookie;
      if (authCookie) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    };
    const userTypeStatus = () => {
      const userTypeCookie = document.cookie
        .split(";")
        .map((cookie) => cookie.trim().split("="))
        .find(([name, value]) => name === "userType");

      return userTypeCookie ? decodeURIComponent(userTypeCookie[1]) : null;
    };

    const userTypeValue = userTypeStatus();

    if (userTypeValue === "Expert") {
      setUserType("Expert");
    } else if (userTypeValue === "User") {
      setUserType("User");
    }

    checkLoggedInStatus();
    console.log(
      "documemnt.cookie is ------->>>>>",
      document.cookie,
      "&&&&&& userTypecookie is---->>",
      userTypeValue
    );
  }, []); // Empty dependency array to run only on component mount

  const [isAvailabilityUI, setIsAvailabilityUI] = useState(false);
  const [initialPara, setInitialPara] = useState(
    "You have not saved any available dates yet"
  );

  const handleAddAvailabilityButton = async () => {
    setIsAvailabilityUI(true);
    const response = await fetch(
      userType === "Expert" &&
        "http://localhost:8000/api/v1/experts/current-expert",
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

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        userType,
        setUserType,
        isAvailabilityUI,
        setIsAvailabilityUI,
        handleAddAvailabilityButton,
        initialPara,
        setInitialPara,
        handleCrossAvailabilityButton,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
