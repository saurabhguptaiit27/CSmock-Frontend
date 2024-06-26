import React from "react";

export default function About() {
  return (
    <>
      {/* Team Section: Circle Photos with Title */}
      <div className="bg-gray-950/95 mt-10 min-h-screen">
        <div className="container mx-auto space-y-10 px-4 py-10 lg:px-8 lg:py-25 xl:max-w-7xl">
          {/* Heading */}
          <div className="text-center">
            <div className="mb-1 text-sm font-bold uppercase tracking-wider text-red-600">
              Real People
            </div>
            <h2 className="mb-4 text-4xl font-black text-gray-300">
              Meet our talented team
            </h2>
            <h3 className="mx-auto text-xl font-medium leading-relaxed text-gray-400 lg:w-2/3">
              They are working nonstop behind the scenes to help you build
              better products, web services and websites.
            </h3>
          </div>
          {/* END Heading */}

          {/* Team */}
          <div className="grid grid-cols-1 gap-8 text-center sm:grid-cols-2 md:grid-cols-3 md:gap-14">
            <div>
              <span className="mb-5 inline-block rounded-full bg-gray-400 p-2 shadow-lg bg-gray-500/75 shadow-gray-500">
                <img
                  src="/saurabhgupta.jpg"
                  alt="User Avatar"
                  className="inline-block size-28 rounded-full"
                />
              </span>
              <h4 className="mb-0.5 text-xl font-bold text-red-600">
                Saurabh Gupta
              </h4>
              <p className="font-medium text-gray-400">Software Developer</p>
            </div>
          </div>
          {/* END Team */}
        </div>
      </div>
      {/* END Team Section: Circle Photos with Title */}
    </>
  );
}
