import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { SelectedButtonContext } from "../Context/SelectedButtonProvider.jsx";
import { AuthContext } from "../Context/AuthProvider.jsx";
import { useNavigate } from "react-router-dom";
import { CurrentUserContext } from "../Context/CurrentUserProvider.jsx";
import toast from "react-hot-toast";

const Login = () => {
  const location = useLocation();
  const { selectedButton, setSelectedButton, handleButtonClick } = useContext(
    SelectedButtonContext
  );
  const { isLoggedIn, setIsLoggedIn, setUserType } = useContext(AuthContext);
  const { setCurrentUser } = useContext(CurrentUserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const pathnameParts = location.pathname.split("/");
    const lastPart = pathnameParts[pathnameParts.length - 1];
    {
      lastPart === "Expert" && !isLoggedIn
        ? setSelectedButton("Expert")
        : setSelectedButton("User");
    }
  }, [location]);

  const [formData, setFormData] = useState({
    email: "user@gmail.com",
    password: "1234",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        selectedButton === "User"
          ? "https://csmock-backend.onrender.com/api/v1/users/login"
          : "https://csmock-backend.onrender.com/api/v1/experts/login",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            // Add any other headers as needed
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        toast.error("Failed to Login");
        throw new Error("Failed to Login");
      }

      //the server returns a JSON object with a token upon successful login
      const data = await response.json();

      const accessTokenExpiry = new Date(Date.now() + 1 * 24 * 60 * 60 * 1000);
      const refreshTokenExpiry = new Date(
        Date.now() + 10 * 24 * 60 * 60 * 1000
      );

      // Check if the response contains an access token in data["data"]["details"]
      if (data["data"]["accessToken"]) {
        document.cookie = `accessToken=${
          data["data"]["accessToken"]
        };expires=${accessTokenExpiry.toUTCString()};path=/`;
        document.cookie = `refreshToken=${
          data["data"]["refreshToken"]
        };expires=${refreshTokenExpiry.toUTCString()};path=/`;
        document.cookie = `userType=${
          data["data"]["details"]["userType"]
        };expires=${refreshTokenExpiry.toUTCString()};path=/`;

        setUserType(data["data"]["details"]["userType"]);
        setSelectedButton(data["data"]["details"]["userType"]);
        setIsLoggedIn(true);
        setCurrentUser(data["data"]["details"]);
        localStorage.setItem(
          "currentUser",
          JSON.stringify(data["data"]["details"])
        );

        // Navigate to the Home route
        navigate("/");
        toast.success("Successfully Logged In!");
      } else {
        throw new Error("Access token not found in response");
      }

      console.log("Login successful:", data);
      // Clear form after successful login
      setFormData({ email: "", password: "" });
    } catch (error) {
      navigate("/Login/User");
      console.error("Login error : ", error.message);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="mx-auto max-screen-xl px-4 pt-20 pb-12 mt-5 sm:px-6 lg:px-8 bg-gray-950">
      <div className="mx-auto max-w-lg">
        <h1 className="text-center text-2xl font-bold text-yellow-400 sm:text-3xl">
          Hey, Welcome Back !
        </h1>

        <p className="mx-auto mt-4 max-w-md text-center text-gray-500">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati
          sunt dolores deleniti inventore quaerat mollitia?
        </p>

        <div className="flex items-center justify-center pt-10">
          <div className="flex items-center p-1 border bg-gray-200 bg-opacity-95 rounded-2xl border-yellow-600 gap-3">
            <Link to="/Login/User">
              <button
                className={`px-4 py-2 text-sm font-medium ${
                  selectedButton === "User" ? "bg-green-600 text-white " : ""
                } text-blue-600 capitalize transition-colors duration-300 md:py-3 focus:outline-none hover:bg-blue-600 hover:text-white rounded-xl md:px-12`}
                onClick={() => handleButtonClick("User")}
              >
                User
              </button>
            </Link>
            <Link to="/Login/Expert">
              <button
                className={`px-4 py-2 text-sm font-medium ${
                  selectedButton === "Expert" ? "bg-green-600 text-white " : ""
                } text-blue-600 capitalize transition-colors duration-300 md:py-3 focus:outline-none hover:bg-blue-600 hover:text-white rounded-xl md:px-12`}
                onClick={() => handleButtonClick("Expert")}
              >
                Expert
              </button>
            </Link>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mb-0 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
        >
          <p className="text-center text-lg font-medium text-gray-300 pb-2">
            Hey {selectedButton === "User" ? "User !" : "Expert !"} Sign in to
            your account
          </p>

          <div>
            <label htmlFor="email" className="sr-only">
              Email
            </label>

            <div className="relative">
              <input
                type="email"
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Enter email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />

              <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                  />
                </svg>
              </span>
            </div>
          </div>

          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>

            <div className="relative">
              <input
                type="password"
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Enter password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />

              <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </span>
            </div>
          </div>

          <button className="block w-full rounded-lg bg-blue-600 px-5 py-3 text-sm font-medium text-white">
            Sign in
          </button>

          <p className="text-center text-sm text-gray-400">
            No account ?{" "}
            <Link
              to="/Register/User"
              className="underline hover:text-yellow-300"
            >
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
