import React, { useContext, useLayoutEffect } from "react";
import { useState } from "react";
import { MdOutlineCancel } from "react-icons/md";
import { AuthContext } from "../Context/AuthProvider";

const Feedback = ({ setFeedbackUI, setIsFeedbackGiven, currentBookingId }) => {
  const { userType, isLoggedIn } = useContext(AuthContext);
  const [feedbackData, setFeedbackData] = useState({
    bookingId: "",
    rating: 5,
    comment: "",
  });

  useLayoutEffect(() => {
    setFeedbackData({
      ...feedbackData,
      bookingId: currentBookingId,
    });
  }, [currentBookingId]);

  const handleFeedbackSubmitButton = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        userType === "User" &&
          isLoggedIn &&
          "https://csmock-backend.onrender.com/api/v1/users-experts/givefeedback",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            // Add any other headers as needed
          },
          body: JSON.stringify(feedbackData),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to give feedback to expert");
      }
      const data = await response.json();
      setFeedbackUI(false);
      setIsFeedbackGiven(true);
    } catch (error) {
      console.error("Error while giving feedback", error);
    }
  };

  const handleRatingSelection = (value) => {
    setFeedbackData({ ...feedbackData, rating: value });
  };

  const handleTextSelection = (text) => {
    setFeedbackData({
      ...feedbackData,
      comment: text,
    });
  };

  const handleCrossFeedbackUIButton = () => {
    setFeedbackUI(false);
  };

  /////////////////////////////////////////////

  return (
    <form
      onSubmit={handleFeedbackSubmitButton}
      className="max-w-md mx-auto p-4 bg-gray-600/90 shadow rounded fixed top-20 right-2 z-20 w-[22rem]"
    >
      <h2 className="text-2xl text-green-500 font-bold mb-4">Feedback Form</h2>
      <button
        style={{
          backgroundColor: "#C7505B",
          color: "#000000",
          opacity: 0.8,
          margin: "0 2px",
          padding: "1px 1px",
          fontSize: "25px",
          fontWeight: "bold",
          borderRadius: "15px",
          cursor: "pointer",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.6)",
          transition: "all 0.3s ease",
        }}
        onClick={() => handleCrossFeedbackUIButton()}
        className="absolute top-2 right-2"
      >
        <MdOutlineCancel />
      </button>

      <div className="mb-4">
        <label className="block mb-1 text-yellow-500">
          Rating <span className="text-red-500">*</span>
        </label>
        <div className="flex items-center space-x-2 text-blue-300">
          <input
            type="radio"
            name="rating"
            id="rating1"
            value="1"
            className="focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(event) => handleRatingSelection(event.target.value)}
          />
          <label for="rating1">1</label>
          <input
            type="radio"
            name="rating"
            id="rating2"
            value="2"
            className="focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(event) => handleRatingSelection(event.target.value)}
          />
          <label for="rating2">2</label>
          <input
            type="radio"
            name="rating"
            id="rating3"
            value="3"
            className="focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(event) => handleRatingSelection(event.target.value)}
          />
          <label for="rating3">3</label>
          <input
            type="radio"
            name="rating"
            id="rating4"
            value="4"
            className="focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(event) => handleRatingSelection(event.target.value)}
          />
          <label for="rating4">4</label>
          <input
            type="radio"
            name="rating"
            id="rating5"
            value="5"
            className="focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(event) => handleRatingSelection(event.target.value)}
          />
          <label for="rating5">5</label>
        </div>
      </div>

      <div className="mb-4">
        <label for="comment" className="block mb-1 text-yellow-500">
          Message
        </label>
        <textarea
          id="comment"
          name="comment"
          value={feedbackData.comment}
          rows="3"
          maxLength={120}
          placeholder="Leave a message for our expert (optional)"
          className="w-full py-2 px-4 bg-gray-800 text-gray-100 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(event) => handleTextSelection(event.target.value)}
        ></textarea>
      </div>

      <button
        type="submit"
        className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md shadow-gray-500"
      >
        Submit
      </button>
    </form>
  );
};

export default Feedback;
