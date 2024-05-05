import React, { createContext, useState, useEffect } from "react";

// Create a context
export const AllExpertsContext = createContext();

// Provider component
export const AllExpertsProvider = ({ children }) => {
  const [allExperts, setAllExperts] = useState([]);

  const fetchAllExperts = async () => {
    try {
      const response = await fetch("/api/v1/experts/allexperts", {
        method: "GET",
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Failed to fetch experts");
      }
      const data = await response.json();
      setAllExperts(data["data"]); // API returns an object with data of experts
    } catch (error) {
      console.error("Error fetching experts:", error);
    }
  };

  useEffect(() => {
    fetchAllExperts();
  }, []);

  return (
    <AllExpertsContext.Provider
      value={{
        allExperts,
        setAllExperts,
        fetchAllExperts,
      }}
    >
      {children}
    </AllExpertsContext.Provider>
  );
};
