import React, { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthProvider";
import ExpertBookings from "./ExpertBookings.jsx";
import Report from "../Feedback/Report.jsx";
const ExpertBookingsUI = () => {
  const { userType, isLoggedIn } = useContext(AuthContext);
  const [reportUI, setReportUI] = useState(false);
  const [currentBookingId, setCurrentBookingId] = useState("");

  return (
    <>
      {isLoggedIn && userType === "Expert" && (
        <ExpertBookings
          reportUI={reportUI}
          setReportUI={setReportUI}
          setCurrentBookingId={setCurrentBookingId}
        />
      )}
      {isLoggedIn && userType === "Expert" && reportUI && (
        <Report setReportUI={setReportUI} currentBookingId={currentBookingId} />
      )}
    </>
  );
};

export default ExpertBookingsUI;
