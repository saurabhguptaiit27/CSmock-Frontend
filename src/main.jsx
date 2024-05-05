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
import OurExperts from "./components/OurExperts/OurExperts.jsx";
import Booking from "./components/Booking/Booking.jsx";
import BookingConfirmation from "./components/Booking/BookingConfirmation.jsx";
import { useContext } from "react";
import { AuthContext } from "./components/Context/AuthProvider.jsx";
import { SelectedButtonProvider } from "./components/Context/SelectedButtonProvider.jsx";
import { CurrentUserProvider } from "./components/Context/CurrentUserProvider.jsx";
import { ToggleUIProvider } from "./components/Context/ToggleUiProvider.jsx";
import UserBookingsUI from "./components/YourBookings/UserBookingsUI.jsx";
import ExpertBookingsUI from "./components/YourBookings/ExpertBookingsUI.jsx";
import Error from "./components/Error/Error.jsx";
import ContactUs from "./components/ContactUs/ContactUs.jsx";
import DiscussionsUI from "./components/Discussions/DiscussionsUI.jsx";
import TopStories from "./news/TopStories.jsx";
import PostAJob from "./job/PostAJob.jsx";
import FindJobs from "./job/FindJobs.jsx";

const App = () => {
  const { isLoggedIn, userType } = useContext(AuthContext);
  // Define routes based on authentication status
  const routes = [
    {
      path: "/",
      element: <Home />,
      children: [
        { path: "", element: <Home /> },
        { path: "Ourexperts", element: <OurExperts /> },
        { path: "About", element: <About /> },
        { path: "TopStories", element: <TopStories /> },
        { path: "Faqs", element: <Faqs /> },
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
          element: isLoggedIn ? <DiscussionsUI /> : <Error />,
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
              <ExpertBookingsUI />
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
        {
          path: "/postajob",
          element: isLoggedIn ? (
            userType === "Expert" ? (
              <PostAJob />
            ) : (
              <Error />
            )
          ) : (
            <Error />
          ),
        },
        {
          path: "/findjobs",
          element: isLoggedIn ? <FindJobs /> : <Error />,
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
      <ToggleUIProvider>
        <CurrentUserProvider>
          <AllExpertsProvider>
            <SelectedButtonProvider>
              <App />
            </SelectedButtonProvider>
          </AllExpertsProvider>
        </CurrentUserProvider>
      </ToggleUIProvider>
    </AuthProvider>
  </>
);
