import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthProvider.jsx";
import { useNavigate } from "react-router-dom";
import { LiaPowerOffSolid } from "react-icons/lia";
import { CiSettings } from "react-icons/ci";
import { PiHandshake } from "react-icons/pi";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { CurrentUserContext } from "../Context/CurrentUserProvider.jsx";
import { ToggleUIContext } from "../Context/ToggleUiProvider.jsx";
import toast from "react-hot-toast";

const User = () => {
  const { setIsLoggedIn, userType, setUserType } = useContext(AuthContext);
  const { setToggleProfile } = useContext(ToggleUIContext);

  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);

  const navigate = useNavigate();

  const handleLogoutButton = async () => {
    try {
      const response = await fetch(
        userType === "User" ? "/api/v1/users/logout" : "/api/v1/experts/logout",
        {
          method: "POST",
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to logout---///");
      }

      setIsLoggedIn(false);
      setUserType("User");
      setCurrentUser([]);
      setToggleProfile(false);
      localStorage.removeItem("currentExpertData"); // Remove items from localStorage
      localStorage.removeItem("currentUser");
      navigate("/");
      toast.success("Successfully Logged Out!");
    } catch (error) {
      console.error("Logout error ====== : ", error);
    }
  };

  return (
    <div className="fixed top-10 right-2 z-30 mt-10">
      <div
        className="bg-gray-400/95 end-0 w-52 rounded-md border border-green shadow-lg mr-5 text-left fixed"
        role="menu"
      >
        <div className="p-2 ">
          <a
            href="#"
            className="block rounded-lg px-4 py-2 text-sm font-bold text-black hover:bg-gray-50 hover:text-gray-700"
            role="menuitem"
          >
            {currentUser["fullname"]}
          </a>
          <hr className="border-amber-400 my-1" />

          <a
            href="#"
            className="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm font-bold text-black hover:bg-gray-50 hover:text-gray-700"
            role="menuitem"
          >
            <HiOutlineUserCircle />
            Profile
          </a>

          <Link
            onClick={() => setToggleProfile(false)}
            to="/yourbookings"
            className="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm font-bold text-black hover:bg-gray-50 hover:text-gray-700"
            role="menuitem"
          >
            <PiHandshake />
            Your Bookings
          </Link>

          <a
            href="#"
            className="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm font-bold text-black hover:bg-gray-50 hover:text-gray-700"
            role="menuitem"
          >
            <CiSettings /> Settings
          </a>

          <div>
            <Link
              to=""
              onClick={() => handleLogoutButton()}
              className="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm font-bold text-red-700 hover:bg-red-400
              hover:text-black"
              role="menuitem"
            >
              <LiaPowerOffSolid className="text-black" />
              Logout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
