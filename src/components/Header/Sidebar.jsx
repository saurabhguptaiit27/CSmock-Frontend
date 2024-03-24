import React from "react";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { FaAward } from "react-icons/fa";
import { GiDiscussion } from "react-icons/gi";
import { ImInfo } from "react-icons/im";
import { IoNewspaperSharp } from "react-icons/io5";
const Sidebar = () => {
  return (
    <aside className="fixed top-10 leftt-2 z-30 mt-10 ml-2">
      <div class="flex flex-col w-56 h-auto px-2 py-6 overflow-y-auto bg-gray-700/90 rounded-lg z=30">
        <div class="flex flex-col justify-between flex-1 -mt-2">
          <nav>
            <Link
              class="flex items-center px-4 py-2 text-gray-100 transition-all duration-800 transform rounded-md hover:bg-gray-900  hover:text-gray-100"
              to=""
            >
              <FaHome />

              <span class="mx-4 font-medium">Home</span>
            </Link>
            <Link
              class="flex items-center px-4 py-2 text-gray-100 transition-all duration-800 transform rounded-md hover:bg-gray-900  hover:text-gray-100"
              to="Ourexperts"
            >
              <FaAward />

              <span class="mx-4 font-medium">Our Experts</span>
            </Link>
            <Link
              class="flex items-center px-4 py-2 text-gray-100 transition-all duration-800 transform rounded-md hover:bg-gray-900  hover:text-gray-100"
              to="Discussions"
            >
              <GiDiscussion />

              <span class="mx-4 font-medium">Discussions</span>
            </Link>
            <Link
              class="flex items-center px-4 py-2 text-gray-100 transition-all duration-800 transform rounded-md hover:bg-gray-900  hover:text-gray-100"
              to="TopStories"
            >
              <IoNewspaperSharp />

              <span class="mx-4 font-medium">Top Stories</span>
            </Link>
            <Link
              class="flex items-center px-4 py-2 text-gray-100 transition-all duration-800 transform rounded-md hover:bg-gray-900  hover:text-gray-100"
              to="About"
            >
              <ImInfo />

              <span class="mx-4 font-medium">About</span>
            </Link>
          </nav>
          <hr class="my-4 w-auto border-green-400" />

          <a href="#" class="flex items-center px-4 -mx-2">
            <img
              class="object-cover mx-2 rounded-full h-9 w-9"
              src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
              alt="avatar"
            />
            <span class="mx-2 font-medium text-gray-800 dark:text-gray-200">
              John Doe
            </span>
          </a>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
