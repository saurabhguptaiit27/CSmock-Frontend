import React, { useContext, useLayoutEffect, useEffect, useState } from "react";
import { CurrentUserContext } from "../Context/CurrentUserProvider";
import toast from "react-hot-toast";

const UserBookings = ({
  setFeedbackUI,
  isFeedbackGiven,
  setCurrentBookingId,
}) => {
  const { fetchCurrentUser, currentUser } = useContext(CurrentUserContext);
  useLayoutEffect(() => {
    fetchCurrentUser();
  }, []);

  /////////////////////////////

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
      `/api/v1/users/getuserbyid?string=${encodeURIComponent(userId)}`,
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
      `/api/v1/experts/getexpertbyid?string=${encodeURIComponent(expertId)}`,
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
  }, [currentUser, isFeedbackGiven]);

  ////////////////////////////////////////////
  const handleCancelClick = async (bookingId) => {
    const response = await fetch(
      `/api/v1/users-experts/cancelbooking?string=${encodeURIComponent(
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
      throw new Error("Failed to cancel the booking");
    }
    fetchBookingDetails();
  };
  ///////////////////

  const handleGiveFeedbackButton = (bookingId) => {
    setFeedbackUI(true);
    setCurrentBookingId(bookingId);
  };
  /////////////////////////////////////

  const handleAllBookingsClick = () => {
    fetchBookingDetails();
  };

  const handlePendingSessionsClick = async () => {
    await fetchBookingDetails();
    setBookingDetails((bookingData) =>
      bookingData.filter(
        (fBookingData) => fBookingData.booking.status === "pending"
      )
    );
  };

  const handleCompletedSessionsClick = async () => {
    await fetchBookingDetails();
    setBookingDetails((bookingData) =>
      bookingData.filter(
        (fBookingData) => fBookingData.booking.status === "completed"
      )
    );
  };

  const handleCancelledSessionsClick = async () => {
    await fetchBookingDetails();
    setBookingDetails((bookingData) =>
      bookingData.filter(
        (fBookingData) => fBookingData.booking.status === "cancelled"
      )
    );
  };

  return (
    <section className="h-auto w-auto min-h-screen bg-gray-950/90 py-16 ">
      <h1 className="text-2xl font-semibold text-center text-gray-300 capitalize lg:text-3xl mt-10">
        All Your <span className="text-green-600">Bookings</span> Are Here
      </h1>

      <p className="max-w-2xl mx-auto mt-6 text-center text-gray-300 mb-10">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo incidunt
        ex placeat modi magni quia error alias, adipisci rem similique, at omnis
        eligendi optio eos harum.
      </p>

      <div className="flex flex-row flex-wrap bg-gray-900/50 py-2 px-4 rounded-lg gap-4 my-8 justify-center mx-6 lg:mx-80">
        <button
          onClick={() => handleAllBookingsClick()}
          className="bg-gray-950 text-gray-100 px-4 py-1 rounded-lg hover:bg-gray-950/40 hover:text-green-500 focus:bg-yellow-400 focus:text-black shadow-md shadow-gray-600"
        >
          All Bookings
        </button>
        <button
          onClick={() => handlePendingSessionsClick()}
          className="bg-gray-950 text-gray-100 px-4 py-1 rounded-lg hover:bg-gray-950/40 hover:text-green-500 focus:bg-yellow-400 focus:text-black shadow-md shadow-gray-600"
        >
          Pending Sessions
        </button>
        <button
          onClick={() => handleCompletedSessionsClick()}
          className="bg-gray-950 text-gray-100 px-4 py-1 rounded-lg hover:bg-gray-950/40 hover:text-green-500 focus:bg-yellow-400 focus:text-black shadow-md shadow-gray-600"
        >
          Completed Sessions
        </button>
        <button
          onClick={() => handleCancelledSessionsClick()}
          className="bg-gray-950 text-gray-100 px-4 py-1 rounded-lg hover:bg-gray-950/40 hover:text-green-500 focus:bg-yellow-400 focus:text-black shadow-md shadow-gray-600"
        >
          Cancelled Sessions
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:px-16">
        {bookingDetails.map((bookingData, index) => (
          <div
            key={index}
            className=" border-2  border-gray-400/80 rounded-2xl px-5 py-3 mb-5 hover:bg-gray-950/50 hover:shadow-xl hover:border-transparent hover:shadow-gray-100/40 transition-colors duration-300 transform"
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

            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="mt-2 md:ml-4 xl:w-80">
                {bookingData.booking.status === "pending" ? (
                  <p className="text-xl font-bold text-green-400  hover:text-gray-100">
                    You have an appointment with our expert{" "}
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
                ) : bookingData.booking.status === "completed" ? (
                  <p className="text-xl font-bold text-green-400  hover:text-gray-100">
                    You have completed this session with our expert{" "}
                    <span className="text-yellow-400">
                      {" "}
                      {bookingData.expert.fullname}{" "}
                    </span>{" "}
                    scheduled on{" "}
                    <span className="text-yellow-400">
                      {" "}
                      {bookingData.booking.appointmentDateTime}{" "}
                    </span>
                  </p>
                ) : (
                  <p className="text-xl font-bold text-green-400  hover:text-gray-100">
                    You have cancelled this appointment with our expert{" "}
                    <span className="text-yellow-400">
                      {" "}
                      {bookingData.expert.fullname}{" "}
                    </span>{" "}
                    scheduled on{" "}
                    <span className="text-yellow-400">
                      {" "}
                      {bookingData.booking.appointmentDateTime}{" "}
                    </span>
                  </p>
                )}
                <p className="mt-2 text-gray-400 pb-2 font-bold font-serif">
                  Expert : {bookingData.expert.fullname} <br />
                  Expert's Email : {bookingData.expert.email} <br />
                  Paid: {bookingData.expert.fees} <br />
                  Booked At : {bookingData.booking.bookedAt.slice(0, 21)} <br />
                  Note To Expert : {bookingData.booking.noteToExpert} <br />
                </p>
                <button
                  onClick={() =>
                    bookingData.booking.status === "pending"
                      ? handleCancelClick(bookingData.booking._id)
                      : bookingData.booking.status === "completed"
                      ? !bookingData.booking.feedback &&
                        handleGiveFeedbackButton(bookingData.booking._id)
                      : null
                  }
                  className={
                    bookingData.booking.status === "pending"
                      ? "text-black bg-yellow-400 rounded-xl px-8 py-1 mt-3"
                      : bookingData.booking.status === "completed"
                      ? !bookingData.booking.feedback
                        ? "text-black bg-green-500 rounded-xl px-8 py-1 mt-3"
                        : "text-black bg-green-800 rounded-xl px-8 py-1 mt-3 cursor-not-allowed"
                      : "text-black bg-red-600/50 rounded-xl px-8 py-1 mt-3 cursor-not-allowed"
                  }
                >
                  {bookingData.booking.status === "pending"
                    ? "Cancel"
                    : bookingData.booking.status === "completed"
                    ? !bookingData.booking.feedback
                      ? "Give Feedback"
                      : "Done"
                    : "Cancelled"}
                </button>
              </div>
              <div className="">
                <img
                  className="hidden xl:block w-[12rem] h-[12rem] rounded-3xl mt-2 md:ml-4 xl:ml-16"
                  src={
                    bookingData.booking.status === "cancelled"
                      ? "/Cancelled.png"
                      : bookingData.booking.status === "completed"
                      ? "/Completed.png"
                      : bookingData.expert.avatar
                  }
                  alt="Expert Avatar"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* </div> */}
    </section>
  );
};

export default UserBookings;
