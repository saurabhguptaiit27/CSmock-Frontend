
import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthProvider";
// Create a context
export const CurrentUserContext = createContext();

// Provider component
export const CurrentUserProvider = ({ children }) => {
  const { isLoggedIn, userType } = useContext(AuthContext);
  const [currentUser, setCurrentUser] = useState([]);

  const fetchCurrentUser = async () => {
    try {
      const response = await fetch(
        isLoggedIn &&
          (userType === "User"
            ? "http://localhost:8000/api/v1/users/current-user"
            : "http://localhost:8000/api/v1/experts/current-expert"),
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch current user");
      }
      const data = await response.json();
      console.log(data["data"]);
      setCurrentUser(data["data"]);
    } catch (error) {
      console.error(
        "Error while fetching current user in context ---->",
        error
      );
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, [isLoggedIn, userType]);

  return (
    <CurrentUserContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        fetchCurrentUser,
      }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
};
