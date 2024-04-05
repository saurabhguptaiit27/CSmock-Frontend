import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CurrentUserContext } from "../Context/CurrentUserProvider";

const BookingConfirmation = () => {
  const [currentExpertData, setCurrentExpertData] = useState([]);
  const { currentUser } = useContext(CurrentUserContext);
  const currentExpertIdS = localStorage.getItem("currentExpertId");
  const [formData, setFormData] = useState({
    userId: "",
    expertId: "",
    appointmentDateTime: "",
    noteToExpert: "",
    bookedAt: "",
  });

  useEffect(() => {
    const fetchCurrrentExpertById = async (expertId) => {
      try {
        const response = await fetch(
          `/api/v1/experts/getexpertbyid?string=${encodeURIComponent(
            expertId
          )}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "text/plain",
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch current expert for booking");
        }
        const responseData = await response.json();
        setCurrentExpertData(responseData["data"]);
      } catch (error) {
        console.error("Failed to fetch current expert for booking", error);
      }
    };
    fetchCurrrentExpertById(JSON.parse(currentExpertIdS));
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setFormData({
        ...formData,
        userId: currentUser._id,
        expertId: currentExpertData._id,
      });
    }, 10);
  }, [currentExpertData, currentUser]);

  const handleDateSelection = (date) => {
    setFormData({ ...formData, appointmentDateTime: date });
  };

  const handleTextSelection = (text) => {
    setFormData({
      ...formData,
      noteToExpert: text,
      bookedAt: new Date(Date.now()).toString(),
    });
  };

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("/api/v1/users-experts/appointmentbooking", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error("Failed to book appointment");
      }
      const data = await response.json();
      localStorage.removeItem("currentExpertData");
      // Remove items from localStorage
      navigate("/yourbookings");
    } catch (error) {
      navigate("/Booking");
      console.error("Booking error----- : ", error.message);
    }
  };

  return (
    <div>
      <div className="flex h-auto items-center justify-center bg-gray-900 p-5 mt-16">
        <div className="grid md:grid-cols-2 grid-cols-1 items-center gap-10 md:px-10 shadow-2xl shadow-lime-500/40 border border-green-500 p-10 hover:bg-gray-950/50 hover:shadow-xl hover:border-transparent hover:shadow-gray-100/40 transition-colors duration-300 transform">
          <div>
            <h1 className="mb-2 text-3xl font-bold text-white">
              <span className="text-gray-100">Hi, </span> I am{" "}
              <span className="text-yellow-400">
                {currentExpertData.fullname}{" "}
              </span>
              <span className="font-light text-lg">
                ({currentExpertData.currentPosition})
              </span>
            </h1>
            <p className="mb-6 text-gray-400 font-bold font-serif">
              Fullname : {currentExpertData.fullname} <br />
              Email : {currentExpertData.email}
              <br />
              Gender : {currentExpertData.gender}
              <br />
              Contact No. : {currentExpertData.phone}
              <br />
              {`Worked In : ${currentExpertData.previousCompanies}`}
              <br />
              Total Experience : {currentExpertData.experience} years
              <br />
              {`Expertise In : ${currentExpertData.expertise}`}
              <br />
              Fees : &#8377; {currentExpertData.fees}
            </p>

            <form onSubmit={handleSubmit} className="md:w-full">
              <div className="flex flex-wrap justify-center space-x-5 mb-5">
                <label for="selectedDate" className="text-yellow-400">
                  Select One of the Available Slots :
                </label>
                {currentExpertData.availability &&
                  currentExpertData.availability.map((date, index) => (
                    <div className="flex items-center mb-2" key={index}>
                      <input
                        type="radio"
                        id={`date-${index}`}
                        name="selectedDate"
                        value={date}
                        required
                        onChange={(event) =>
                          handleDateSelection(event.target.value)
                        }
                      />
                      <label
                        className="ml-2 text-blue-500"
                        htmlFor={`date-${index}`}
                      >
                        {date}
                      </label>
                    </div>
                  ))}
              </div>

              <div className="flex flex-col my-5">
                <textarea
                  name="input"
                  id="input"
                  rows="5"
                  maxLength={256}
                  required
                  placeholder="Add a Special note for the expert"
                  className="rounded-lg p-4 bg-gray-900 border-2 border-solid border-black font-mono font-medium text-sm text-gray-300"
                  onChange={(event) => handleTextSelection(event.target.value)}
                ></textarea>
              </div>

              <div className="flex justify-center space-x-5">
                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-1 rounded-2xl bg-green-500 p-5 py-3 font-semibold text-white hover:bg-green-700"
                >
                  Confirm Your Appointment
                </button>
              </div>
            </form>
          </div>
          <div className="flex justify-center  align-middle ">
            <img
              src={currentExpertData.avatar}
              alt=""
              className="size-64 rounded-xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;
