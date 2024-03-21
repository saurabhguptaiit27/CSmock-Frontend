// AuthProvider.js
import React, { createContext, useState, useEffect } from "react";

// Create a context
export const AuthContext = createContext();

// Provider component
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState("User");

  useEffect(() => {
    const checkLoggedInStatus = async () => {
      const accessTokenCookie = document.cookie
        .split(";")
        .map((cookie) => cookie.trim().split("="))
        .find(([name, value]) => name === "accessToken");
      const refreshTokenCookie = document.cookie
        .split(";")
        .map((cookie) => cookie.trim().split("="))
        .find(([name, value]) => name === "refreshToken");
      if (accessTokenCookie) {
        setIsLoggedIn(true);
      } else if (!accessTokenCookie && refreshTokenCookie) {
        await fetch(
          userType === "User"
            ? "http://localhost:8000/api/v1/users/refresh-token"
            : "http://localhost:8000/api/v1/experts/refresh-token",
          {
            method: "POST",
            credentials: "include",
          }
        );
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
  }, []); // Empty dependency array to run only on component mount

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        userType,
        setUserType,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
