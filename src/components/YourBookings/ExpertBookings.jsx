import React, { useEffect, useLayoutEffect, useState, useContext } from "react";
import { CurrentUserContext } from "../Context/CurrentUserProvider";

const ExpertBookings = ({ reportUI, setReportUI, setCurrentBookingId }) => {
  const { fetchCurrentUser, currentUser } = useContext(CurrentUserContext);
  useLayoutEffect(() => {
    fetchCurrentUser();
  }, []);

  /////////////////////////

  // Fetch a single booking by ID
  const fetchBookingById = async (bookingId) => {
    const response = await fetch(
      `/api/v1/users-experts/getbookingbyid?string=${encodeURIComponent(
        bookingId
      )}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "text/plain",
        },
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch booking id");
    }

    const booking = await response.json();
    return booking["data"];
  };

  // Fetch a single user by ID
  const fetchUserById = async (userId) => {
    const response = await fetch(
      `/api/v1/users/getuserbyid?string=${encodeURIComponent(
        userId
      )}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "text/plain",
        },
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch user id");
    }
    const user = await response.json();
    return user["data"];
  };

  // Fetch a single expert by ID
  const fetchExpertById = async (expertId) => {
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
      throw new Error("Failed to fetch expert id");
    }
    const expert = await response.json();
    return expert["data"];
  };

  ///////////////////////////////////////
  const [bookingDetails, setBookingDetails] = useState([]);

  const fetchBookingDetails = async () => {
    if (!currentUser || !currentUser.bookingHistory) return;

    const promises = currentUser.bookingHistory.map(async (bookingId) => {
      const booking = await fetchBookingById(bookingId);
      const user = await fetchUserById(booking.user);
      const expert = await fetchExpertById(booking.expert);

      return {
        booking,
        user,
        expert,
      };
    });

    const resolvedBookings = await Promise.all(promises);
    setBookingDetails(resolvedBookings);
  };

  useEffect(() => {
    fetchBookingDetails();
  }, [currentUser, reportUI]);

  ////////////////////////////////////////////
  const handleConcludeClick = async (bookingId) => {
    const response = await fetch(
      `/api/v1/users-experts/concludebooking?string=${encodeURIComponent(
        bookingId
      )}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "text/plain",
        },
      }
    );
    if (!response.ok) {
      throw new Error("Failed to conclude the booking");
    }
    fetchBookingDetails();
  };

  const handleGenerateReportButton = (bookingId) => {
    setReportUI(true);
    setCurrentBookingId(bookingId);
  };

  ////////////////////////////////////////////
  return (
    <section className="h-auto w-auto min-h-screen bg-gray-950/90 py-16">
      <h1 class="text-2xl font-semibold text-center text-gray-300 capitalize lg:text-3xl mt-10">
        Our <span class="text-green-600">Executive Team</span>
      </h1>

      <p class="max-w-2xl mx-auto mt-6 mb-10 text-center text-gray-300">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo incidunt
        ex placeat modi magni quia error alias, adipisci rem similique, at omnis
        eligendi optio eos harum.
      </p>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:px-16">
        {bookingDetails.map((bookingData, index) => (
          <div
            key={index}
            className=" border-2  border-green-400/50 rounded-2xl px-5 py-3 mb-5 hover:bg-gray-950/50"
          >
            <div className="flex items-center justify-between ">
              <p className="px-3 py-1 text-sm font-bold text-gray-100 transition-colors duration-300 transform bg-gray-600 rounded cursor-pointer hover:bg-gray-800">
                {bookingData.booking.status === "pending"
                  ? "PENDING"
                  : bookingData.booking.status === "completed"
                  ? "COMPLETED"
                  : "CANCELLED"}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 ">
              <div className="mt-2 md:ml-4">
                <p className="text-xl font-bold text-green-400  hover:text-gray-100">
                  You have an Appointment with our user{" "}
                  <span className="text-yellow-400">
                    {" "}
                    {bookingData.user.fullname}{" "}
                  </span>{" "}
                  on{" "}
                  <span className="text-yellow-400">
                    {" "}
                    {bookingData.booking.appointmentDateTime}{" "}
                  </span>
                </p>
                <p className="mt-2 pb-2 text-gray-400 font-bold font-serif ">
                  User : {bookingData.user.fullname} <br />
                  User Email : {bookingData.user.email} <br />
                  Booked At : {bookingData.booking.bookedAt} <br />
                  Note for you : {bookingData.booking.noteToExpert} <br />
                </p>
                <button
                  onClick={() =>
                    bookingData.booking.status === "pending"
                      ? handleConcludeClick(bookingData.booking._id)
                      : bookingData.booking.status === "completed"
                      ? !bookingData.booking.report &&
                        handleGenerateReportButton(bookingData.booking._id)
                      : null
                  }
                  className={
                    bookingData.booking.status === "pending"
                      ? "text-black bg-yellow-400 rounded-xl px-8 py-1 mt-3"
                      : bookingData.booking.status === "completed"
                      ? !bookingData.booking.report
                        ? "text-black bg-green-500 rounded-xl px-8 py-1 mt-3"
                        : "text-black bg-green-800 rounded-xl px-8 py-1 mt-3 cursor-not-allowed"
                      : "text-black bg-red-600/50 rounded-xl px-8 py-1 mt-3 cursor-not-allowed"
                  }
                >
                  {bookingData.booking.status === "pending"
                    ? "Conclude"
                    : bookingData.booking.status === "completed"
                    ? !bookingData.booking.report
                      ? "Generate Report"
                      : "Done"
                    : "Cancelled"}
                </button>
              </div>
              <div className="">
                <img
                  className="w-[12rem] h-[12rem] rounded-3xl mt-2 md:ml-4 xl:ml-16 md:mt-10"
                  src={
                    bookingData.booking.status === "cancelled"
                      ? "/Cancelled.png"
                      : bookingData.booking.status === "completed"
                      ? "/Completed.png"
                      : bookingData.user.avatar
                  }
                  alt="User Avatar"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ExpertBookings;
