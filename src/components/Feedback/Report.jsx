import React, { useContext, useLayoutEffect } from "react";
import { useState } from "react";
import { MdOutlineCancel } from "react-icons/md";
import { AuthContext } from "../Context/AuthProvider";

const Report = ({ setReportUI, setIsReportSubmitted, currentBookingId }) => {
  const { userType, isLoggedIn } = useContext(AuthContext);
  const [reportData, setReportData] = useState({
    bookingId: "",
    rating1Rating: 0,
    rating1Comment: "",
    rating2Rating: 0,
    rating2Comment: "",
    rating3Rating: 0,
    rating3Comment: "",
    overallComment: "",
  });

  useLayoutEffect(() => {
    setReportData({
      ...reportData,
      bookingId: currentBookingId,
    });
  }, [currentBookingId]);

  const handleReportSubmitButton = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        userType === "Expert" &&
          isLoggedIn &&
          "/api/v1/users-experts/givereport",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            // Add any other headers as needed
          },
          body: JSON.stringify(reportData),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to generate report from expert");
      }
      const data = await response.json();
      setReportUI(false);
      setIsReportSubmitted(true);
    } catch (error) {
      console.error("Error while generating report", error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setReportData({
      ...reportData,
      [name]: value,
    });
  };

  const handleCrossReportUIButton = () => {
    setReportUI(false);
  };

  /////////////////////////////////////////////

  return (
    <form
      onSubmit={handleReportSubmitButton}
      className="max-w-md mx-auto p-4 bg-gray-600/90 shadow rounded fixed top-20 right-2 z-20 text-xs md:text-base md:w-[32rem] w-64"
    >
      <h2 className="text-2xl text-green-500 font-bold mb-4">Report Form</h2>
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
        onClick={() => handleCrossReportUIButton()}
        className="absolute top-2 right-2"
      >
        <MdOutlineCancel />
      </button>

      <div className="mb-2 flex flex-col">
        <p className="block mb-1 text-yellow-500">
          Round 1 <span className="text-red-500">*</span>
        </p>
        <div className="flex items-center space-x-2 text-white">
          <label for="round1Rating">Rating : </label>
          <input
            type="number"
            name="round1Rating"
            id="round1Rating"
            min={0}
            max={10}
            value={reportData.round1Rating}
            className="focus:outline-none focus:ring-2 focus:ring-blue-500 w-12 text-white bg-gray-800 rounded-md pl-2"
            onChange={handleInputChange}
          />
          <label for="round1Rating">/ 10 </label>
        </div>
        <div className="mt-1">
          <label for="round1Comment" className="block mb-1 text-white">
            Remarks :
          </label>
          <textarea
            id="round1Comment"
            name="round1Comment"
            value={reportData.round1Comment}
            rows="1"
            maxLength={120}
            placeholder="for round 1"
            className="w-full py-1 px-4 bg-gray-800 text-gray-100 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleInputChange}
          ></textarea>
        </div>
      </div>

      <div className="mb-2 flex flex-col">
        <p className="block mb-1 text-yellow-500">
          Round 2 <span className="text-red-500">*</span>
        </p>
        <div className="flex items-center space-x-2 text-white">
          <label for="round2Rating">Rating : </label>
          <input
            type="number"
            name="round2Rating"
            id="round2Rating"
            min={0}
            max={10}
            value={reportData.round2Rating}
            className="focus:outline-none focus:ring-2 focus:ring-blue-500 w-12 text-white bg-gray-800 rounded-md pl-2"
            onChange={handleInputChange}
          />
          <label for="round2Rating">/ 10 </label>
        </div>
        <div className="mt-1">
          <label for="round2Comment" className="block mb-1 text-white">
            Remarks :
          </label>
          <textarea
            id="round2Comment"
            name="round2Comment"
            value={reportData.round2Comment}
            rows="1"
            maxLength={120}
            placeholder="for round 2"
            className="w-full py-1 px-4 bg-gray-800 text-gray-100 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleInputChange}
          ></textarea>
        </div>
      </div>

      <div className="mb-2 flex flex-col">
        <p className="block mb-1 text-yellow-500">
          Round 3 <span className="text-red-500">*</span>
        </p>
        <div className="flex items-center space-x-2 text-white">
          <label for="round3Rating">Rating : </label>
          <input
            type="number"
            name="round3Rating"
            id="round3Rating"
            min={0}
            max={10}
            value={reportData.round3Rating}
            className="focus:outline-none focus:ring-2 focus:ring-blue-500 w-12 text-white bg-gray-800 rounded-md pl-2"
            onChange={handleInputChange}
          />
          <label for="round3Rating">/ 10 </label>
        </div>
        <div className="mt-1">
          <label for="round3Comment" className="block mb-1 text-white">
            Remarks :
          </label>
          <textarea
            id="round3Comment"
            name="round3Comment"
            value={reportData.round3Comment}
            rows="1"
            maxLength={120}
            placeholder="for round 3"
            className="w-full py-1 px-4 bg-gray-800 text-gray-100 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleInputChange}
          ></textarea>
        </div>
      </div>

      <div className="mb-6 flex flex-col">
        <p className="block mb-1 text-yellow-500">
          Overall Remark <span className="text-red-500">*</span>
        </p>
        <div className="mt-1">
          <textarea
            id="overallComment"
            name="overallComment"
            rows="3"
            maxLength={120}
            value={reportData.overallComment}
            placeholder="give your final words ..."
            className="w-full py-1 px-4 bg-gray-800 text-gray-100 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleInputChange}
          ></textarea>
        </div>
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

export default Report;
