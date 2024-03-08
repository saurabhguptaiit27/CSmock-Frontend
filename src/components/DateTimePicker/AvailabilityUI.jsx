import DateTimePicker from "../DateTimePicker/DateTimePicker.jsx";
import React, { useState } from "react";
import { MdOutlineCancel } from "react-icons/md";

const AvailabilityUI = ({ handleCrossAvailabilityButton }) => {
  let [values, setValues] = useState([]);
  const [paragraphContent, setParagraphContent] = useState("");

  return (
    <section class="fixed top-16 right-0 bg-white z-20 rounded-xl border">
      <div class="max-w-3xl px-16 py-16 mx-auto text-center">
        <button
          style={{
            backgroundColor: "#C7505B",
            color: "#000000",
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
        <h1 class="text-3xl font-semibold text-gray-800 -mt-10">
          Please Add Availability...
        </h1>
        <p class="max-w-md mx-auto mt-5 text-gray-500 dark:text-gray-400">
          You Can Select multiple Slots
        </p>

        <p class="max-w-md mx-auto mt-5 text-black dark:text-gray-400">
          {values.map(
            (e) =>
              (e = `${e.day}/${e.month.name}/${e.year} ${e.hour}:${e.minute}`)
          )}
        </p>

        {paragraphContent && <p>{paragraphContent}</p>}

        <div class="flex flex-col mt-8 space-y-3 sm:space-y-0 sm:flex-row sm:justify-center sm:-mx-2">
          <DateTimePicker
            values={values}
            setValues={setValues}
            setParagraphContent={setParagraphContent}
          />
        </div>
      </div>
    </section>
  );
};

export default AvailabilityUI;
