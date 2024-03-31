import React, { useContext } from "react";
import { AllExpertsContext } from "../Context/AllExpertsProvider";
import { FaRegStar } from "react-icons/fa";
import { Link } from "react-router-dom";
const OurExperts = () => {
  const { allExperts } = useContext(AllExpertsContext);

  return (
    <section className="bg-gray-950/95 mt-10 min-h-screen">
      <div className="container px-6 py-10 mx-auto">
        <h1 className="text-2xl font-semibold text-center text-gray-300 capitalize lg:text-3xl">
          Our <span className="text-green-600">Executive Team</span>
        </h1>

        <p className="max-w-2xl mx-auto my-6 text-center text-gray-300">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo incidunt
          ex placeat modi magni quia error alias, adipisci rem similique, at
          omnis eligendi optio eos harum.
        </p>

        <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 lg:grid-cols-3">
          {allExperts.map((e, index) => (
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

              <div className="flex flex-row flex-wrap gap-2 justify-center">
                {Array.from(e.previousCompanies).map((prevComp) => (
                  <button className="bg-yellow-400 px-3 rounded-xl">
                    {prevComp}
                  </button>
                ))}
              </div>

              <ul className="mt-2 text-gray-200 font-serif">
                <li>{`Email : ${e.email}`}</li>
                <li>{`Phone : ${e.phone}`}</li>
                <li>{`Experience : ${e.experience} years`}</li>
              </ul>

              <div className="my-3 flex flex-row flex-wrap gap-2 justify-center">
                {Array.from(e.expertise).map((prevComp) => (
                  <button className="bg-yellow-200/70 px-3 rounded-md">
                    {prevComp}
                  </button>
                ))}
              </div>

              <div className="flex flex-col text-sm  md:flex-row relative">
                <Link
                  to="/Login/User"
                  className="mt-2 px-4 py-2 bg-blue-500/80 border-2 border-gray-600 rounded-lg active:bg-gray-400 transition-colors text-yellow-400 shadow-lg shadow-gray-400/30"
                >
                  Login To Book
                </Link>
                <div className="flex flex-row mt-1 justify-center md:absolute md:right-0">
                  <p className="mr-2 mt-3 text-white">Ratings :</p>
                  <FaRegStar className="text-yellow-400 mt-4" />
                  <p className="ml-1 mt-3.5 text-white">5 / 5</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurExperts;
