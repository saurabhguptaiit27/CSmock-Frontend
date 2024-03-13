import React, { useContext, useEffect } from "react";
import DatePicker, { DateObject } from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import "react-multi-date-picker/styles/layouts/prime.css";
import { AuthContext } from "../Context/AuthProvider";

export default function DateTimePicker({
  values,
  setValues,
  setParagraphContent,
}) {
  const { userType } = useContext(AuthContext);

  const handleClearButton = async () => {
    setValues([]);
    const appointmentDateTime = [];
    console.log(".......on clear");
    const response = await fetch(
      userType === "Expert" &&
        "http://localhost:8000/api/v1/experts/addavailability",
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          // Add any other headers as needed
        },
        body: JSON.stringify(appointmentDateTime),
      }
    );

    console.log(appointmentDateTime);
    setParagraphContent("You have not saved any available dates yet");
  };

  const handleAvailabilitySubmitButton = async () => {
    try {
      console.log("......on submit");
      const appointmentDateTime = values.map(
        (e) => (e = `${e.day}/${e.month.name}/${e.year} ${e.hour}:${e.minute}`)
      );
      const response = await fetch(
        userType === "Expert" &&
          "http://localhost:8000/api/v1/experts/addavailability",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            // Add any other headers as needed
          },
          body: JSON.stringify(appointmentDateTime),
        }
      );

      console.log(appointmentDateTime);

      setParagraphContent(
        "Your Availability is saved and will be shown to users"
      );
    } catch (error) {
      console.error("Error:", error); // Log any errors
    }
  };

  //   console.log(values);

  return (
    <>
      <div>
        <DatePicker
          className="rmdp-mobile mt-16"
          style={{
            backgroundColor: "",
            fontSize: "16px",
            height: "24px",
            width: "220px",
            cursor: "cell",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.6)",
          }}
          placeholder="&#x1F4C5;Can Select Multiple Slots"
          value={values}
          onChange={setValues}
          format="DD/MM/YYYY HH:mm A"
          multiple
          sort
          plugins={[
            <TimePicker position="bottom" hideSeconds />,
            <DatePanel markFocused />,
          ]}
        />
        <button
          onClick={() => handleAvailabilitySubmitButton()}
          //   type="submit"
          style={{
            backgroundColor: "green",
            border: "none",
            color: "#fff",
            margin: "0 10px",
            padding: "1px 10px",
            fontSize: "15px",
            fontWeight: "bold",
            borderRadius: "5px",
            cursor: "pointer",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.6)",
            transition: "all 0.3s ease",
          }}
        >
          Submit
        </button>
        <button
          onClick={() => handleClearButton()}
          style={{
            backgroundColor: "#C7505B",
            color: "#000000",
            margin: "0 2px",
            padding: "1px 10px",
            fontSize: "15px",
            fontWeight: "bold",
            borderRadius: "5px",
            cursor: "pointer",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.6)",
            transition: "all 0.3s ease",
          }}
        >
          Clear
        </button>
      </div>
    </>
  );
}
