import React, { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthProvider";
import ExpertBookings from "./ExpertBookings.jsx";
import Report from "../Feedback/Report.jsx";
const ExpertBookingsUI = () => {
  const { userType, isLoggedIn } = useContext(AuthContext);
  const [reportUI, setReportUI] = useState(false);
  const [isReportSubmitted, setIsReportSubmitted] = useState(false);
  const [currentBookingId, setCurrentBookingId] = useState("");

  return (
    <>
      {isLoggedIn && userType === "Expert" && (
        <ExpertBookings
          reportUI={reportUI}
          setReportUI={setReportUI}
          isReportSubmitted={isReportSubmitted}
          setIsReportSubmitted={setIsReportSubmitted}
          setCurrentBookingId={setCurrentBookingId}
        />
      )}
      {isLoggedIn && userType === "Expert" && reportUI && (
        <Report
          setReportUI={setReportUI}
          setIsReportSubmitted={setIsReportSubmitted}
          currentBookingId={currentBookingId}
        />
      )}
    </>
  );
};

export default ExpertBookingsUI;
