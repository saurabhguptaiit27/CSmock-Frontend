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
import UserBookingsUI from "./components/YourBookings/UserBookingsUI.jsx";
import ExpertBookings from "./components/YourBookings/ExpertBookings.jsx";
import Error from "./components/Error/Error.jsx";
import ContactUs from "./components/ContactUs/ContactUs.jsx";
import Discussions from "./components/Discussions/Discussions.jsx";

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
          element: !isLoggedIn ? <Login /> : <Error />,
        },
        {
          path: "Login/Expert",
          element: !isLoggedIn ? <Login /> : <Error />,
        },
        {
          path: "Register/User",
          element: !isLoggedIn ? <Register /> : <Error />,
        },
        {
          path: "Register/Expert",
          element: !isLoggedIn ? <RegisterExpert /> : <Error />,
        },
        {
          path: "Discussions",
          element: isLoggedIn ? <Discussions /> : <Error />,
        },
        {
          path: "Booking",
          element: isLoggedIn ? (
            userType === "User" ? (
              <Booking />
            ) : (
              <Error />
            )
          ) : (
            <Login />
          ),
        },
        {
          path: "Booking/confirmation",
          element: isLoggedIn ? (
            userType === "User" ? (
              <BookingConfirmation />
            ) : (
              <Error />
            )
          ) : (
            <Error />
          ),
        },
        {
          path: "yourbookings",
          element: isLoggedIn ? (
            userType === "User" ? (
              <UserBookingsUI />
            ) : (
              <ExpertBookings />
            )
          ) : (
            <Error />
          ),
        },
        {
          path: "*",
          element: <Error />,
        },
        {
          path: "/contactus",
          element: <ContactUs />,
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
      <CurrentUserProvider>
        <AllExpertsProvider>
          <SelectedButtonProvider>
            <BookingConfirmationProvider>
              <App />
            </BookingConfirmationProvider>
          </SelectedButtonProvider>
        </AllExpertsProvider>
      </CurrentUserProvider>
    </AuthProvider>
  </>
);
