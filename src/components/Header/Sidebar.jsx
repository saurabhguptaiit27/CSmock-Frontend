import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { FaAward } from "react-icons/fa";
import { GiDiscussion } from "react-icons/gi";
import { ImInfo } from "react-icons/im";
import { IoNewspaperSharp } from "react-icons/io5";
import { PiHandshake } from "react-icons/pi";
import { FaSearchPlus } from "react-icons/fa";
import { AuthContext } from "../Context/AuthProvider";
const Sidebar = () => {
  const { isLoggedIn } = useContext(AuthContext);
  return (
    <aside className="fixed top-10 leftt-2 z-30 mt-10 ml-2">
      <div className="flex flex-col w-56 h-auto px-2 py-6 overflow-y-auto bg-gray-700/90 rounded-lg z=30">
        <div className="flex flex-col justify-between flex-1 -mt-2">
          <nav>
            <Link
              className="flex items-center px-4 py-2 text-gray-100 transition-all duration-800 transform rounded-md hover:bg-gray-900  hover:text-gray-100 hover:shadow-md hover:shadow-gray-100/40 duration-300"
              to=""
            >
              <FaHome />

              <span className="mx-4 font-medium">Home</span>
            </Link>
            {!isLoggedIn && (
              <Link
                className="flex items-center px-4 py-2 text-gray-100 transition-all duration-800 transform rounded-md hover:bg-gray-900  hover:text-gray-100 hover:shadow-md hover:shadow-gray-100/40 duration-300"
                to="/Ourexperts"
              >
                <FaAward />

                <span className="mx-4 font-medium">Our Experts</span>
              </Link>
            )}
            {isLoggedIn && (
              <Link
                className="flex items-center px-4 py-2 text-gray-100 transition-all duration-800 transform rounded-md hover:bg-gray-900  hover:text-gray-100 hover:shadow-md hover:shadow-gray-100/40 duration-300"
                to="/yourbookings"
              >
                <PiHandshake />

                <span className="mx-4 font-medium">Bookings</span>
              </Link>
            )}

            <Link
              className="flex items-center px-4 py-2 text-gray-100 transition-all duration-800 transform rounded-md hover:bg-gray-900  hover:text-gray-100 hover:shadow-md hover:shadow-gray-100/40 duration-300"
              to="/findjobs"
            >
              <FaSearchPlus />

              <span className="mx-4 font-medium">Find Jobs</span>
            </Link>

            <Link
              className="flex items-center px-4 py-2 text-gray-100 transition-all duration-800 transform rounded-md hover:bg-gray-900  hover:text-gray-100 hover:shadow-md hover:shadow-gray-100/40 duration-300"
              to="/Discussions"
            >
              <GiDiscussion />

              <span className="mx-4 font-medium">Discussions</span>
            </Link>
            <Link
              className="flex items-center px-4 py-2 text-gray-100 transition-all duration-800 transform rounded-md hover:bg-gray-900  hover:text-gray-100 hover:shadow-md hover:shadow-gray-100/40 duration-300"
              to="/TopStories"
            >
              <IoNewspaperSharp />

              <span className="mx-4 font-medium">Top Stories</span>
            </Link>
            <Link
              className="flex items-center px-4 py-2 text-gray-100 transition-all duration-800 transform rounded-md hover:bg-gray-900  hover:text-gray-100"
              to="/About"
            >
              <ImInfo />

              <span className="mx-4 font-medium">About</span>
            </Link>
          </nav>
          <hr className="my-4 w-auto border-green-400" />

          <a href="#" className="flex items-center px-4 -mx-2">
            <img
              className="object-cover mx-2 rounded-full h-9 w-9"
              src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
              alt="avatar"
            />
            <span className="mx-2 font-medium text-gray-800 dark:text-gray-200">
              John Doe
            </span>
          </a>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
