import React, { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthProvider";
import UserBookings from "./UserBookings.jsx";
import Feedback from "../Feedback/Feedback.jsx";

const Home = () => {
  const { userType, isLoggedIn } = useContext(AuthContext);
  const [feedbackUI, setFeedbackUI] = useState(false);
  const [currentBookingId, setCurrentBookingId] = useState("");

  return (
    <>
      {isLoggedIn && userType === "User" && (
        <UserBookings
          setFeedbackUI={setFeedbackUI}
          setCurrentBookingId={setCurrentBookingId}
        />
      )}
      {isLoggedIn && userType === "User" && feedbackUI && (
        <Feedback
          setFeedbackUI={setFeedbackUI}
          currentBookingId={currentBookingId}
        />
      )}
    </>
  );
};

export default Home;
