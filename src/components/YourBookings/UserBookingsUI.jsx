import React, { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthProvider";
import UserBookings from "./UserBookings.jsx";
import Feedback from "../Feedback/Feedback.jsx";

const UserBookingsUI = () => {
  const { userType, isLoggedIn } = useContext(AuthContext);
  const [feedbackUI, setFeedbackUI] = useState(false);
  const [isFeedbackGiven, setIsFeedbackGiven] = useState(false);
  const [currentBookingId, setCurrentBookingId] = useState("");

  return (
    <>
      {isLoggedIn && userType === "User" && (
        <UserBookings
          feedbackUI={feedbackUI}
          setFeedbackUI={setFeedbackUI}
          isFeedbackGiven={isFeedbackGiven}
          setIsFeedbackGiven={setIsFeedbackGiven}
          setCurrentBookingId={setCurrentBookingId}
        />
      )}
      {isLoggedIn && userType === "User" && feedbackUI && (
        <Feedback
          setFeedbackUI={setFeedbackUI}
          setIsFeedbackGiven={setIsFeedbackGiven}
          currentBookingId={currentBookingId}
        />
      )}
    </>
  );
};

export default UserBookingsUI;
