import React from "react";
import { useEffect } from "react";

const Home1 = () => {
  return (
    <section className="bg-gradient-to-b from-gray-950 to-gray-950 via-gray-800 text-white">
      <div className="mx-auto max-w-screen-xl px-4 mt-10 py-20 lg:flex lg:h-screen lg:items-center">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="bg-gradient-to-r from-yellow-400 via-green-600 to-yellow-400 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl animate__animated animate-pulse animate__slow animate__infinite">
            Welcome To CSmock
            {/* <span className="sm:block"> Increase Conversion. </span> */}
          </h1>

          <p className="mx-auto mt-4 max-w-xl sm:text-xl/relaxed">
            Empower your career journey with personalized mentorship and mock
            job interviews from industry experts.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              className="block w-full rounded border border-blue-600 bg-blue-600 px-6 py-3 text-sm font-medium text-white hover:bg-green-600 hover:text-white focus:outline-none focus:ring active:text-opacity-75 sm:w-auto"
              href="#"
            >
              Schedule A Session
            </a>

            <a
              className="block w-full rounded border border-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring active:bg-blue-500 sm:w-auto"
              href="#"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home1;
