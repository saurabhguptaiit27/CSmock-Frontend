import React from "react";
import { useState } from "react";
import data from "../../data/UserFeedbackHomepage.json";

const Home4 = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNextClick = () => {
    // Increment the index, wrapping around to the beginning if at the end
    setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
  };

  const handlePreviousClick = () => {
    // Decrement the index, wrapping around to the end if at the beginning
    setCurrentIndex((prevIndex) => (prevIndex - 1 + data.length) % data.length);
  };

  return (
    <section className="bg-gray-950/95">
      <div className="relative flex">
        <div className="min-h-screen lg:w-1/3"></div>
        <div className="hidden w-3/4 min-h-screen bg-gradient-to-r from-gray-900 via-gray-800/90 to-gray-700/90 h-screen  lg:block"></div>

        <div className="container flex flex-col justify-center w-full min-h-screen px-6 py-10 mx-auto lg:absolute lg:inset-x-0">
          <h1 className="text-2xl font-semibold text-gray-300 capitalize lg:text-3xl dark:text-white">
            What our <span className="text-yellow-500"> Users </span> are saying
            ...
          </h1>
          <div className="flex font-serif text-9xl text-green-500">
            &#10077;
          </div>

          <div className="-mt-10 mb-5 lg:-mt-10 lg:flex lg:items-center">
            <img
              className="lg:w-[20rem] md:ml-24 rounded-lg h-96"
              src={data[currentIndex].avatar}
              alt=""
            />

            <div className="lg:px-10 md:mt-0">
              <h1 className="text-2xl font-semibold text-yellow-500 lg:w-auto mt-5">
                {data[currentIndex].contentTitle}
              </h1>

              <p className="max-w-lg mt-6 text-gray-400 text-justify">
                {data[currentIndex].content}
              </p>

              <h3 className="mt-6 text-lg font-medium text-green-500">
                {data[currentIndex].fullname}
              </h3>
              <p className="text-gray-400 mb-5">
                {data[currentIndex].currentPosition}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between mt-12 lg:justify-start">
            <button
              onClick={() => {
                handlePreviousClick();
              }}
              title="left arrow"
              className="p-2 text-white transition-colors duration-300 border rounded-full rtl:-scale-x-100 hover:bg-yellow-400 hover:text-black"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <button
              onClick={() => {
                handleNextClick();
              }}
              title="right arrow"
              className="p-2 text-white transition-colors duration-300 border rounded-full rtl:-scale-x-100  lg:mx-6 hover:bg-yellow-400 hover:text-black"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home4;
