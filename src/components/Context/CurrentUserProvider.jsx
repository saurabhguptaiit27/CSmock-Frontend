// AuthProvider.js
import React, { createContext, useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthProvider";

// Create a context
export const CurrentUserContext = createContext();

// Provider component
export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState([]);

  const { userType } = useContext(AuthContext);
  const { isLoggedIn } = useContext(AuthContext);

  const fetchData = async () => {
    try {
      const response = await fetch(
        userType === "User" && isLoggedIn
          ? "http://localhost:8000/api/v1/users/current-user"
          : "http://localhost:8000/api/v1/experts/current-expert",
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch current user///");
      }
      const data = await response.json();
      setCurrentUser(data["data"]);
      console.log("currentUser in context--->", currentUser);
    } catch (error) {
      console.error("Error fetching current user:----", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [isLoggedIn, userType]);

  return (
    <CurrentUserContext.Provider
      value={{
        currentUser,
        setCurrentUser,
      }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
};
