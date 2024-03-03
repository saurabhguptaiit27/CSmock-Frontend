import { useState } from "react";
import React from "react";
import { Link, NavLink } from "react-router-dom";
import ToggleMenu from "../ToggleMenu/ToggleMenu";

const Header = ({ handleButtonClick, isloggedIn, setIsLoggedIn }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Function to toggle the menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Toggle the state to show/hide the menu
  };

  return (
    <header className="bg-black fixed top-0 left-0 w-full z-20">
      <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8">
        <Link className="block text-teal-600" to="">
          <span className="sr-only">Home</span>
          <img src="/CSmock.png"></img>
        </Link>

        <div className="flex flex-1 items-center justify-end md:justify-between">
          <nav aria-label="Global" className="hidden md:block">
            <ul className="flex items-center gap-6 text-sm">
              <li>
                <NavLink
                  className={({ isActive }) =>
                    `${
                      isActive ? "text-green-300" : "text-gray-300"
                    } transition text-base hover:text-green-100/75`
                  }
                  to=""
                >
                  Home
                </NavLink>
              </li>

              <li>
                <NavLink
                  className={({ isActive }) =>
                    `${
                      isActive ? "text-green-300" : "text-gray-300"
                    } transition text-base hover:text-green-100/75`
                  }
                  to="Ourexperts"
                >
                  Our Experts
                </NavLink>
              </li>

              <li>
                <NavLink
                  className={({ isActive }) =>
                    `${
                      isActive ? "text-green-300" : "text-gray-300"
                    } transition text-base hover:text-green-100/75`
                  }
                  to="Interviewexperiences"
                >
                  Interview Experiences
                </NavLink>
              </li>

              <li>
                <NavLink
                  className={({ isActive }) =>
                    `${
                      isActive ? "text-green-300" : "text-gray-300"
                    } transition text-base hover:text-green-100/75`
                  }
                  to="About"
                >
                  About
                </NavLink>
              </li>

              <li>
                <NavLink
                  className={({ isActive }) =>
                    `${
                      isActive ? "text-green-300" : "text-gray-300"
                    } transition text-base hover:text-green-100/75`
                  }
                  to="Faqs"
                >
                  FAQs
                </NavLink>
              </li>
            </ul>
          </nav>

          {isloggedIn ? (
            <NavLink
              className={({ isActive }) =>
                `${
                  isActive ? "text-green-300" : "text-gray-300"
                } transition text-base hover:text-green-100/75`
              }
              to="User"
            >
              User
            </NavLink>
          ) : (
            <div className="flex items-center gap-4">
              <div className="sm:flex sm:gap-4">
                <Link to="Login/User">
                  <button
                    className="block rounded-md bg-blue-600 px-5 py-2.5 text-sm font-medium  hover:text-teal-100/75 text-white transition hover:bg-blue-600/75"
                    onClick={() => handleButtonClick("User")}
                  >
                    Login
                  </button>
                </Link>

                <Link
                  className="hidden rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-blue-600 transition hover:text-teal-600/75 sm:block"
                  to="Register/User"
                  onClick={() => handleButtonClick("User")}
                >
                  Register
                </Link>
              </div>

              <button
                className="block rounded bg-gray-100 p-2.5 text-gray-600 transition hover:text-gray-600/75 md:hidden"
                onClick={toggleMenu}
              >
                <span className="sr-only">Toggle menu</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
              {isMenuOpen && <ToggleMenu />}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
