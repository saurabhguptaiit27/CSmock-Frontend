import React from "react";
import { FiUser, FiUpload, FiLock, FiBriefcase, FiPhone } from "react-icons/fi";
import { TfiEmail } from "react-icons/tfi";
import { SlBadge } from "react-icons/sl";
import { PiRocketLight } from "react-icons/pi";
import { IoBodyOutline } from "react-icons/io5";
import { GrDocumentUser } from "react-icons/gr";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { SelectedButtonContext } from "../Context/SelectedButtonProvider.jsx";
import { AuthContext } from "../Context/AuthProvider.jsx";

const Register = () => {
  const location = useLocation();
  const { selectedButton, setSelectedButton, handleButtonClick } = useContext(
    SelectedButtonContext
  );
  const { isLoggedIn, setIsLoggedIn, userType, setUserType } =
    useContext(AuthContext);

  useEffect(() => {
    const pathnameParts = location.pathname.split("/");
    const lastPart = pathnameParts[pathnameParts.length - 1];
    {
      lastPart === "User"
        ? setSelectedButton("User")
        : setSelectedButton("Expert");
    }
    console.log("selectedbutton from register user page:", selectedButton);
    console.log("userType from register user page:", userType);
  }, [location]);

  const [formData, setFormData] = useState({
    username: "",
    fullname: "",
    email: "",
    password: "",
    phone: "",
    gender: "",
    proficiency: "",
    expectedRole: [],
    experience: "",
    avatar: null, // Add avatar field to store the uploaded file
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFormData({
      ...formData,
      avatar: file,
    });
  };
  const handleRoleChange = (event) => {
    const { name, value } = event.target;

    // For expectedRole, split the input value by commas and store as an array
    const newValue = name === "expectedRole" ? value.split(",") : value;

    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Send formData to backend or perform form submission logic
    console.log(formData);
  };

  return (
    <section className="bg-gray-950">
      <div className="container flex items-center justify-center min-h-screen px-6 mx-auto py-20">
        <form onSubmit={handleSubmit} className="w-full max-w-md">
          <div className="flex justify-center mx-auto">
            <img
              className="w-auto h-7 sm:h-8 rounded-3xl size-10"
              src="/CSmock.png"
              alt=""
            />
          </div>

          <div className="flex items-center justify-center pt-10">
            <div className="flex items-center p-1 border bg-gray-200 bg-opacity-95 rounded-2xl border-yellow-600 gap-3">
              <Link to="/Register/User">
                <button
                  className={`px-4 py-2 text-sm font-medium ${
                    selectedButton === "User" ? "bg-green-600 text-white " : ""
                  } text-blue-600 capitalize transition-colors duration-300 md:py-3 focus:outline-none hover:bg-blue-600 hover:text-white rounded-xl md:px-12`}
                  onClick={() => handleButtonClick("User")}
                >
                  User
                </button>
              </Link>
              <Link to="/Register/Expert">
                <button
                  className={`px-4 py-2 text-sm font-medium ${
                    selectedButton === "Expert"
                      ? "bg-green-600 text-white "
                      : ""
                  } text-blue-600 capitalize transition-colors duration-300 md:py-3 focus:outline-none hover:bg-blue-600 hover:text-white rounded-xl md:px-12`}
                  onClick={() => handleButtonClick("Expert")}
                >
                  Expert
                </button>
              </Link>
            </div>
          </div>

          <div className="relative flex items-center mt-6">
            <span style={{ color: "gray" }} className=" absolute py-2 px-3">
              <FiUser />
            </span>

            <input
              type="text"
              className="block w-full py-1 text-gray-400 bg-white border rounded-lg px-11  focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              placeholder="Username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="relative flex items-center mt-4">
            <span style={{ color: "gray" }} className=" absolute py-2 px-3">
              <GrDocumentUser />
            </span>

            <input
              type="text"
              className="block w-full py-1 text-gray-400 bg-white border rounded-lg px-11  focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              placeholder="Fullname"
              name="fullname"
              value={formData.fullname}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="relative flex items-center mt-4">
            <span style={{ color: "gray" }} className=" absolute py-2 px-3">
              <FiUpload />
            </span>

            <input
              type="file"
              className="block w-2/3 gap-5  text-gray-400 bg-white border rounded-lg px-11  focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              name="avatar"
              // value={formData.avatar}
              onChange={handleFileChange}
              required
            />

            <span className="block ml-3 py-1 text-gray-950 bg-gray-300 border rounded-lg px-11  focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40">
              <h2>Avatar</h2>
            </span>
          </div>

          <div className="relative flex items-center mt-4">
            <span style={{ color: "gray" }} className=" absolute py-2 px-3">
              <TfiEmail />
            </span>

            <input
              type="email"
              className="block w-full py-1 text-gray-400 bg-white border rounded-lg px-11 focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              placeholder="Email address"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="relative flex items-center mt-4">
            <span style={{ color: "gray" }} className=" absolute py-2 px-3">
              <FiLock />
            </span>

            <input
              type="password"
              className="block w-full px-10 py-1 text-gray-400 bg-white border rounded-lg focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="relative flex items-center mt-4">
            <span style={{ color: "gray" }} className=" absolute py-2 px-3">
              <FiPhone />
            </span>

            <input
              type="text"
              className="block w-full px-10 py-1 text-gray-400 bg-white border rounded-lg focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              placeholder="Phone Number"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="relative flex items-center mt-4">
            <span style={{ color: "gray" }} className=" absolute py-2 px-3">
              <FiBriefcase />
            </span>

            <input
              type="number"
              className="block w-full px-10 py-1 text-gray-400 bg-white border rounded-lg focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              placeholder="Total Experience (in years)"
              name="experience"
              value={formData.experience}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="relative flex items-center mt-4">
            <span style={{ color: "gray" }} className=" absolute py-2 px-3">
              <PiRocketLight />
            </span>

            <input
              type="text"
              className="block w-full px-10 py-1 text-gray-400 bg-white border rounded-lg focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              placeholder="Expected role(s) (seperated with commas)"
              id="expectedRole"
              name="expectedRole"
              onChange={handleRoleChange}
              value={formData.expectedRole}
              multiple
              required
            />
          </div>

          <div className="relative flex items-center mt-4">
            <span style={{ color: "gray" }} className=" absolute py-2 px-3">
              <SlBadge />
            </span>

            <select
              id="proficiency"
              className="block w-full px-10 py-1 text-gray-400 bg-white border rounded-lg focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              placeholder="Proficiency"
              name="proficiency"
              value={formData.proficiency}
              onChange={handleInputChange}
              required
            >
              <option value="">
                Select Your Proficiency For The Expected Role
              </option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="expert">Expert</option>
            </select>
          </div>

          <div className="relative flex items-center mt-4">
            <span style={{ color: "gray" }} className=" absolute py-2 px-3">
              <IoBodyOutline />
            </span>

            <select
              id="gender"
              className="block w-full px-10 py-1 text-gray-400 bg-white border rounded-lg focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              placeholder="Gender"
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Your Gender</option>
              <option value="female">Female</option>
              <option value="male">Male</option>
              <option value="others">Others</option>
            </select>
          </div>

          <div className="mt-6">
            <button className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
              Sign Up
            </button>

            <div className="mt-6 text-center ">
              <Link
                to="/Login/User"
                className="text-sm text-gray-200 hover:underline hover:text-yellow-300 "
              >
                Already have an account?
              </Link>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Register;
