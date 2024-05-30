import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthProvider";
// Create a context
export const CurrentUserContext = createContext();

// Provider component
export const CurrentUserProvider = ({ children }) => {
  const { isLoggedIn, userType } = useContext(AuthContext);
  const [currentUser, setCurrentUser] = useState([]);

  const getCookie = (name) => {
    // Split document.cookie on '; ' to get individual cookie strings
    const cookies = document.cookie.split("; ");

    // Find the cookie that starts with the specified name followed by '='
    const cookie = cookies.find((cookie) => cookie.startsWith(name + "="));

    // If the cookie is found, split on '=' to get the value, otherwise return null
    return cookie ? cookie.split("=")[1] : null;
  };

  const fetchCurrentUser = async () => {
    try {
      if (isLoggedIn) {
        const response = await fetch(
          userType === "User"
            ? `https://csmock-backend.onrender.com/api/v1/users/current-user?encryptionsecret=${getCookie(
                "accessToken"
              )}`
            : `https://csmock-backend.onrender.com/api/v1/experts/current-expert?encryptionsecret=${getCookie(
                "accessToken"
              )}`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch current user");
        }
        const data = await response.json();
        setCurrentUser(data["data"]);
      }
    } catch (error) {
      console.error("Error while fetching current user in context ", error);
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
