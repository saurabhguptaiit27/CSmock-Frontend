import DateTimePicker from "./DateTimePicker.jsx";
import React, { useContext, useLayoutEffect, useState } from "react";
import { MdOutlineCancel } from "react-icons/md";
import { ToggleUIContext } from "../Context/ToggleUiProvider.jsx";
import { CurrentUserContext } from "../Context/CurrentUserProvider.jsx";

const AvailabilityUI = () => {
  const { handleCrossAvailabilityButton } = useContext(ToggleUIContext);
  const { currentUser } = useContext(CurrentUserContext);
  let [values, setValues] = useState([]);
 

  return (
    <section className="bg-gray-600/90 fixed top-16 right-0 z-20 sm- rounded-xl border">
      <div className=" max-w-3xl px-16 py-16 mx-auto text-center">
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
          onClick={() => handleCrossAvailabilityButton()}
          className="absolute top-2 left-2"
        >
          <MdOutlineCancel />
        </button>
        <h1 className="text-3xl font-semibold text-gray-200 -mt-6">
          Please Add Availability...
        </h1>
        <p className="max-w-md mx-auto mt-5 text-gray-100/60 ">
          You Can Select multiple Slots
        </p>

        <p className="max-w-md mx-auto mt-5 text-gray-100 ">
          {values.map(
            (e) =>
              (e = `${e.day}/${e.month.name}/${e.year} ${e.hour}:${e.minute} , `)
          )}
        </p>

        {currentUser.availability.length ? (
          <p className="text-green-400">
            Your Availability is saved and will be shown to users
          </p>
        ) : (
          <p className="text-green-400">
            You have not saved any available dates yet
          </p>
        )}

        <div className="flex flex-col mt-8 space-y-3 sm:space-y-0 sm:flex-row sm:justify-center sm:-mx-2">
          <DateTimePicker
            values={values}
            setValues={setValues}
          />
        </div>
      </div>
    </section>
  );
};

export default AvailabilityUI;
