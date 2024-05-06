import React from "react";
import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../Context/AuthProvider.jsx";
import { SelectedButtonContext } from "../Context/SelectedButtonProvider.jsx";
import { CurrentUserContext } from "../Context/CurrentUserProvider.jsx";
import { AiOutlineMenuUnfold } from "react-icons/ai";
import { AiOutlineMenuFold } from "react-icons/ai";
import { ToggleUIContext } from "../Context/ToggleUiProvider.jsx";

const Header = () => {
  const { isLoggedIn, userType } = useContext(AuthContext);
  const {
    handleAddAvailabilityButton,
    handleToggleProfile,
    toggleMenu,
    handleToggleMenu,
  } = useContext(ToggleUIContext);
  const { handleButtonClick } = useContext(SelectedButtonContext);
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <header className="bg-black fixed top-0 left-0 w-full z-40">
      <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8">
        <button onClick={() => handleToggleMenu()} className="">
          {toggleMenu === false ? (
            <AiOutlineMenuUnfold className=" text-white text-3xl " />
          ) : (
            <AiOutlineMenuFold className=" text-white text-3xl " />
          )}
        </button>
        <Link to="">
          <span className="sr-only">Home</span>
          <img className="rounded-3xl size-10" src="/CSmock.png"></img>
        </Link>

        <div className="flex flex-1 items-center justify-end md:justify-between">
          <nav aria-label="Global" className="hidden md:block">
            <ul className="flex items-center text-sm md:gap-2 lg:gap-6 ">
              <li>
                <NavLink
                  className={({ isActive }) =>
                    `${
                      isActive ? "text-yellow-300" : "text-gray-300"
                    } transition text-base hover:text-green-300/75`
                  }
                  to="/"
                >
                  Home
                </NavLink>
              </li>

              {!isLoggedIn && (
                <li>
                  <NavLink
                    className={({ isActive }) =>
                      `${
                        isActive ? "text-yellow-300" : "text-gray-300"
                      } transition text-base hover:text-green-300/75`
                    }
                    to="/Ourexperts"
                  >
                    Our Experts
                  </NavLink>
                </li>
              )}

              {isLoggedIn && (
                <li>
                  <NavLink
                    className={({ isActive }) =>
                      `${
                        isActive ? "text-yellow-300" : "text-gray-300"
                      } transition text-base hover:text-green-300/75`
                    }
                    to="/yourbookings"
                  >
                    Bookings
                  </NavLink>
                </li>
              )}

              <li>
                <NavLink
                  className={({ isActive }) =>
                    `${
                      isActive ? "text-yellow-300" : "text-gray-300"
                    } transition text-base hover:text-green-300/75`
                  }
                  to="/findjobs"
                >
                  Find Jobs
                </NavLink>
              </li>

              <li>
                <NavLink
                  className={({ isActive }) =>
                    `${
                      isActive ? "text-yellow-300" : "text-gray-300"
                    } transition text-base hover:text-green-300/75`
                  }
                  to="/Discussions"
                >
                  Discussions
                </NavLink>
              </li>

              <li>
                <NavLink
                  className={({ isActive }) =>
                    `${
                      isActive ? "text-yellow-300" : "text-gray-300"
                    } transition text-base hover:text-green-300/75`
                  }
                  to="/TopStories"
                >
                  Top Stories
                </NavLink>
              </li>

              <li>
                <NavLink
                  className={({ isActive }) =>
                    `${
                      isActive ? "text-yellow-300" : "text-gray-300"
                    } transition text-base hover:text-green-300/75`
                  }
                  to="/About"
                >
                  About
                </NavLink>
              </li>
            </ul>
          </nav>

          {isLoggedIn && userType === "Expert" && (
            <Link to="">
              <button
                className="absolute top-3 right-24 block rounded-md bg-yellow-500 px-3 py-2 text-sm font-medium  hover:text-gray-100 text-black transition hover:bg-green-500/75"
                onClick={() => handleAddAvailabilityButton()}
              >
                Add Availability
              </button>
            </Link>
          )}

          {isLoggedIn && userType === "User" && (
            <Link to="/Booking">
              <button className="absolute top-3 right-24 block rounded-md bg-yellow-500 px-3 py-2 text-sm font-medium  hover:text-gray-100 text-black transition hover:bg-green-500/75">
                Our Experts
              </button>
            </Link>
          )}

          {isLoggedIn ? (
            <button
              onClick={() => handleToggleProfile()}
              className={({ isActive }) =>
                `${
                  isActive ? "text-green-300" : "text-gray-300"
                } transition text-base hover:text-green-100/75`
              }
            >
              <div className="flex items-center gap-x-6">
                <div className="absolute right-10">
                  <img
                    className="object-cover w-7 h-7 rounded-full ring ring-gray-300 "
                    src={currentUser.avatar}
                    alt=""
                  />
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 absolute right-0 ring-1 ring-white -bottom-0.5"></span>
                </div>
              </div>
            </button>
          ) : (
            <div className="flex items-center gap-4">
              <div className="sm:flex sm:gap-4">
                <Link to="/Login/User">
                  <button
                    className="block rounded-md bg-blue-600 px-5 py-2.5 text-sm font-medium  hover:text-teal-100/75 text-white transition hover:bg-blue-600/75"
                    onClick={() => handleButtonClick("User")}
                  >
                    Login
                  </button>
                </Link>

                <Link
                  className="hidden rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-blue-600 transition hover:text-teal-600/75 sm:block"
                  to="/Register/User"
                  onClick={() => handleButtonClick("User")}
                >
                  Register
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
