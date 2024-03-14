// AuthProvider.js
import React, { createContext, useState, useEffect } from "react";

// Create a context
export const AllExpertsContext = createContext();

// Provider component
export const AllExpertsProvider = ({ children }) => {
  const [allExperts, setAllExperts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/api/v1/experts/allexperts"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch experts");
        }
        const data = await response.json();
        setAllExperts(data["data"]); // API returns an object with data of experts
      } catch (error) {
        console.error("Error fetching experts:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <AllExpertsContext.Provider
      value={{
        allExperts,
        setAllExperts,
      }}
    >
      {children}
    </AllExpertsContext.Provider>
  );
};