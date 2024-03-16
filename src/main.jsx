import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "../src/index.css";
import { AuthProvider } from "./components/Context/AuthProvider.jsx";
import { AllExpertsProvider } from "./components/Context/AllExpertsProvider.jsx";
import Layout from "./Layout.jsx";
import Home from "./components/Home/Home.jsx";
import About from "./components/About/About.jsx";
import Faqs from "./components/FAQs/Faqs.jsx";
import Register from "./components/Register/Register.jsx";
import RegisterExpert from "./components/Register/RegisterExpert.jsx";
import Login from "./components/Login/Login.jsx";
import IntExperiences from "./components/IntExperiences/IntExperiences.jsx";
import OurExperts from "./components/OurExperts/OurExperts.jsx";
import Booking from "./components/Booking/Booking.jsx";
import BookingConfirmation from "./components/Booking/BookingConfirmation.jsx";
import { useContext } from "react";
import { AuthContext } from "./components/Context/AuthProvider.jsx";
import { SelectedButtonProvider } from "./components/Context/SelectedButtonProvider.jsx";
import { CurrentUserProvider } from "./components/Context/CurrentUserProvider.jsx";
import { BookingConfirmationProvider } from "./components/Context/BookingConfirmationProvider.jsx";
import UserBookings from "./components/YourBookings/UserBookings.jsx";

const App = () => {
  const { isLoggedIn, userType } = useContext(AuthContext);

  // Define routes based on authentication status
  const routes = [
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "", element: <Home /> },
        { path: "Ourexperts", element: <OurExperts /> },
        { path: "About", element: <About /> },
        { path: "Faqs", element: <Faqs /> },
        { path: "InterviewExperiences", element: <IntExperiences /> },
        {
          path: "Login/User",
          element: !isLoggedIn && <Login />,
        },
        {
          path: "Login/Expert",
          element: !isLoggedIn && <Login />,
        },
        {
          path: "Register/User",
          element: !isLoggedIn && <Register />,
        },
        {
          path: "Register/Expert",
          element: !isLoggedIn && <RegisterExpert />,
        },
        {
          path: "Booking",
          element: userType === "User" && isLoggedIn && <Booking />,
        },
        {
          path: "Booking/confirmation",
          element: userType === "User" && isLoggedIn && <BookingConfirmation />,
        },
        {
          path: "yourbookings",
          element: userType === "User" && isLoggedIn && <UserBookings />,
        },
      ],
    },
  ];

  const router = createBrowserRouter(routes);

  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <AuthProvider>
      <AllExpertsProvider>
        <SelectedButtonProvider>
          <CurrentUserProvider>
            <BookingConfirmationProvider>
              <App />
            </BookingConfirmationProvider>
          </CurrentUserProvider>
        </SelectedButtonProvider>
      </AllExpertsProvider>
    </AuthProvider>
  </>
);
