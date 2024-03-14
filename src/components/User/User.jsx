import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthProvider.jsx";
import { CurrentUserContext } from "../Context/CurrentUserProvider.jsx";
import { useNavigate } from "react-router-dom";
import { LiaPowerOffSolid } from "react-icons/lia";
import { CiSettings } from "react-icons/ci";
import { PiHandshake } from "react-icons/pi";
import { HiOutlineUserCircle } from "react-icons/hi2";

const User = () => {
  const { setIsLoggedIn, userType, setUserType } = useContext(AuthContext);
  const { currentUser } = useContext(CurrentUserContext);
  const navigate = useNavigate();

  const handleLogoutButton = async () => {
    try {
      const response = await fetch(
        userType === "User"
          ? "http://localhost:8000/api/v1/users/logout"
          : "http://localhost:8000/api/v1/experts/logout",
        {
          method: "POST",
          credentials: "include",
        }
      );

      console.log("response is-------:", response);

      if (!response.ok) {
        throw new Error("Failed to logout---///");
      }

      setIsLoggedIn(false);
      setUserType("User");
      console.log("user logged out successfully");
      navigate("/");
    } catch (error) {
      console.error("Logout error ====== : ", error);
    }
  };

  return (
    <div class="fixed top-10 right-2 z-30 mt-10">
      <div
        class="bg-gray-400/95 end-0 w-52 rounded-md border border-green shadow-lg mr-5 text-left fixed"
        role="menu"
      >
        <div class="p-2 ">
          <a
            href="#"
            class="block rounded-lg px-4 py-2 text-sm font-bold text-black hover:bg-gray-50 hover:text-gray-700"
            role="menuitem"
          >
            {currentUser["fullname"]}
          </a>
          <hr className="border-amber-400" />

          <a
            href="#"
            class="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm font-bold text-black hover:bg-gray-50 hover:text-gray-700"
            role="menuitem"
          >
            <HiOutlineUserCircle />
            Profile
          </a>

          <a
            href="#"
            class="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm font-bold text-black hover:bg-gray-50 hover:text-gray-700"
            role="menuitem"
          >
            <PiHandshake />
            Your Bookings
          </a>

          <a
            href="#"
            class="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm font-bold text-black hover:bg-gray-50 hover:text-gray-700"
            role="menuitem"
          >
            <CiSettings /> Settings
          </a>

          <div>
            <Link
              to=""
              onClick={() => handleLogoutButton()}
              class="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm font-bold text-red-500/70 hover:bg-red-400
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
