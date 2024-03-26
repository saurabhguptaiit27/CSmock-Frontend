import React, { useEffect } from "react";
import { useContext } from "react";
import { AllExpertsContext } from "../Context/AllExpertsProvider";
import { useNavigate } from "react-router-dom";

import { BookingConfirmationContext } from "../Context/BookingConfirmationProvider.jsx";

const Booking = () => {
  const { allExperts } = useContext(AllExpertsContext);

  const { currentExpertData, setCurrentExpertData } = useContext(
    BookingConfirmationContext
  );

  const navigate = useNavigate();

  const handleExpertBookClick = (e) => {
    setCurrentExpertData(e);
    setTimeout(function () {
      navigate("/Booking/confirmation");
    }, 10);
  };

  useEffect(() => {
    const saveStateToLocalStorage = () => {
      try {
        localStorage.setItem(
          "currentExpertData",
          JSON.stringify(currentExpertData)
        );
      } catch (error) {
        console.error("Error saving state to local storage:", error);
      }
    };
    saveStateToLocalStorage();
  }, [currentExpertData]);

  // "bg-gradient-to-b from-yellow-400/70 to-yellow-400/70 via-gray-500 mt-10 min-h-screen"
  return (
    <section className="bg-gradient-to-r from-amber-200/90 to-yellow-300/90 mt-10 min-h-screen">
      <div className="container px-6 py-10 mx-auto">
        <h1 className="text-2xl font-semibold text-center text-black capitalize lg:text-4xl ">
          Book A <span className="text-green-500 ">Session</span> With An Expert
        </h1>
        <hr className="border-black border-2 mt-5" />
        <p className="max-w-2xl mx-auto mt-6 text-center text-black text-lg font-bold">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo incidunt
          ex placeat modi magni quia error alias, adipisci rem similique, at
          omnis eligendi optio eos harum.
        </p>

        <section className="grid grid-cols-1 gap-8 mt-8 xl:mt-12 lg:grid-cols-2 xl:grid-cols-3 bg-gradient-to-b from-gray-500/70 to-gray-500/70 via-gray-500/50 p-5 rounded-3xl">
          {allExperts &&
            allExperts.map((e, index) => (
              <div
                key={index}
                className="relative p-8 bg-slate-600/60 hover:bg-green-700/60 border rounded-lg"
              >
                <div className="flex items-center mb-5 ">
                  <img
                    className="object-cover mx-2 rounded-full w-14 shrink-0 h-14 ring-4 ring-gray-300 "
                    src={e.avatar}
                    alt="Profile Picture"
                  />

                  <div className=" mx-2">
                    <h1 className="font-semibold text-green-500 text-xl">
                      {e.fullname}
                    </h1>
                    <span className="text-sm text-gray-200">
                      {e.currentPosition}
                    </span>
                  </div>
                </div>

                <ul className="leading-loose text-gray-200 font-serif">
                  <li>{`Prev Comp : ${e.previousCompanies}`}</li>
                  <li>{`username : ${e.username}`}</li>
                  <li>{`Expertise : ${e.expertise}`}</li>
                </ul>

                <button
                  onClick={() => handleExpertBookClick(e)}
                  className="mt-2 px-4 py-2 bg-blue-500/80 border-2 border-gray-600 rounded-lg active:bg-gray-400 transition-colors text-yellow-400 shadow-lg shadow-gray-400/30"
                >
                  Book @ &#8377; {e.fees}
                </button>
              </div>
            ))}
        </section>
      </div>
    </section>
  );
};

export default Booking;
