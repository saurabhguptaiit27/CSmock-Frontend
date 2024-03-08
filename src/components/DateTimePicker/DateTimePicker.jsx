import React, { useEffect } from "react";
import DatePicker, { DateObject } from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import "react-multi-date-picker/styles/layouts/prime.css";
import axios from "axios";

export default function DateTimePicker({ values, setValues,setParagraphContent }) {
  const handleClearButton = () => {
    setValues([]);
    const appointmentDateTime = [];
    console.log(".......on clear")
    console.log(appointmentDateTime)
    setParagraphContent('You have not set any available dates');
  };

  const handleAvailabilitySubmitButton = async () => {
    try {
      // console.log(values.map(
      //     (e) => (e = `${e.day}/${e.month.name}/${e.year} ${e.hour}:${e.minute}`)
      //   ))
      console.log("......on submit")
      const appointmentDateTime = values.map(
        (e) => (e = `${e.day}/${e.month.name}/${e.year} ${e.hour}:${e.minute}`)
      );
      console.log(appointmentDateTime);
      setParagraphContent('Your Availability is saved and will be shown to users');
      // Make an HTTP POST request to your server with the formatted values
      // const response = await axios.post('YOUR_SERVER_ENDPOINT', { values });
      // console.log(response.data); // Log the response from the server
    } catch (error) {
      console.error("Error:", error); // Log any errors
    }
  };

  //   console.log(values);

  return (
    <>
      <div>
        <DatePicker
          className="rmdp-mobile"
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
