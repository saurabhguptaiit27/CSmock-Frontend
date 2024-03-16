import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthProvider.jsx";

const UserBookings = () => {
  const [currentUserB, setCurrentUserB] = useState([]);
  const { userType, isLoggedIn } = useContext(AuthContext);
  const fetchData = async () => {
    try {
      const response = await fetch(
        userType === "User" &&
          isLoggedIn &&
          "http://localhost:8000/api/v1/users/current-user",
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch current user///");
      }
      const data = await response.json();
      setCurrentUserB(data["data"]);
    } catch (error) {
      console.error("Error fetching current user in your bookings:----", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  ///////////////////////////////////////

  // Fetch a single booking by ID
  const fetchBookingById = async (bookingId) => {
    const response = await fetch(
      `http://localhost:8000/api/v1/users-experts/getbookingbyid?string=${encodeURIComponent(
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
      throw new Error("Failed to fetch booking");
    }

    const booking = await response.json();
    console.log("hbgygygygygy----booking is", booking);
    return booking["data"];
  };

  // Fetch a single user by ID
  const fetchUserById = async (userId) => {
    const response = await fetch(
      `http://localhost:8000/api/v1/users/getuserbyid?string=${encodeURIComponent(
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
      throw new Error("Failed to fetch user");
    }
    const user = await response.json();
    return user["data"];
  };

  // Fetch a single expert by ID
  const fetchExpertById = async (expertId) => {
    const response = await fetch(
      `http://localhost:8000/api/v1/experts/getexpertbyid?string=${encodeURIComponent(
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
      throw new Error("Failed to fetch expert");
    }
    const expert = await response.json();
    return expert["data"];
  };

  ///////////////////////////////////////
  const [bookingDetails, setBookingDetails] = useState([]);

  useEffect(() => {
    const fetchBookingDetails = async () => {
      if (!currentUserB || !currentUserB.bookingHistory) return;

      const promises = currentUserB.bookingHistory.map(async (bookingId) => {
        console.log("--------elem", bookingId);
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

    fetchBookingDetails();
  }, [currentUserB]);

  setTimeout(() => {
    console.log("currentUser in your booking--->", currentUserB);
    console.log("bookingDetails----->", bookingDetails);
  }, 1000);
  ////////////////////////////////////////////
  return (
    <section className="h-auto w-auto min-h-screen bg-gray-950/90 py-16">
      <div class=" md:px-60 mx-10 py-32 mt-16 bg-gray-900/50 rounded-lg shadow-md items-center">
        {bookingDetails.map((bookingData, index) => (
          <div
            key={index}
            className=" border-2  border-green-400/50 rounded-2xl px-5 py-3 mb-5 hover:bg-gray-950/50"
          >
            <div className="flex items-center justify-between ">
              <p className="px-3 py-1 text-sm font-bold text-gray-100 transition-colors duration-300 transform bg-gray-600 rounded cursor-pointer hover:bg-gray-800">
                {bookingData.booking.status}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 ">
              <div className="mt-2 xl:ml-16">
                <p className="text-xl font-bold text-green-400  hover:text-gray-100">
                  You have an Appointment with{" "}
                  <span className="text-yellow-400">
                    {" "}
                    {bookingData.expert.fullname}{" "}
                  </span>{" "}
                  on{" "}
                  <span className="text-yellow-400">
                    {" "}
                    {bookingData.booking.appointmentDateTime}{" "}
                  </span>
                </p>
                <p className="mt-2 text-gray-200 ">
                  User: {bookingData.user.fullname} <br />
                  Expert: {bookingData.expert.fullname} <br />
                  Paid: {bookingData.expert.fees} <br />
                  Booked At: {bookingData.booking.bookedAt} <br />
                  Note To Expert: {bookingData.booking.noteToExpert} <br />
                </p>
                <button className="text-black bg-yellow-400 rounded-xl px-8 py-1 mt-3">
                  Cancel
                </button>
              </div>
              <div className="">
                <img
                  className="w-[12rem] h-[12rem] rounded-full mt-2 xl:ml-40 xl:mt-5"
                  src={bookingData.expert.avatar}
                  alt=""
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default UserBookings;
