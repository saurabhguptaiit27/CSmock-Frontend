import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useState, useEffect } from "react";
import "../src/index.css";
import Layout from "./Layout.jsx";
import Home from "./components/Home/Home.jsx";
import About from "./components/About/About.jsx";
import Faqs from "./components/FAQs/Faqs.jsx";
import Register from "./components/Register/Register.jsx";
import Login from "./components/Login/Login.jsx";
import IntExperiences from "./components/IntExperiences/IntExperiences.jsx";
import OurExperts from "./components/OurExperts/OurExperts.jsx";


const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Define functions to get router config based on isLoggedIn value
  const getLoggedInRoutes = () => {
    return [
      {
        path: "/",
        element: <Layout />,
        children: [
          { path: "", element: <Home /> },
          { path: "about", element: <About /> },
          { path: "ourexperts", element: <OurExperts /> },
          { path: "interviewexperiences", element: <IntExperiences /> },
          { path: "FAQs", element: <Faqs /> },
        ],
      },
    ];
  };

  const getLoggedOutRoutes = () => {
    return [
      {
        path: "/",
        element: <Layout />,
        children: [
          { path: "", element: <Home /> },
          { path: "about", element: <About /> },
          { path: "ourexperts", element: <OurExperts /> },
          { path: "interviewexperiences", element: <IntExperiences /> },
          { path: "FAQs", element: <Faqs /> },
          { path: "Login/User", element: <Login /> },
          { path: "Login/Expert", element: <Login /> },
          { path: "Register/User", element: <Register /> },
          { path: "Register/Expert", element: <Register /> },
        ],
      },
    ];
  };

  // Define initial router config based on isLoggedIn value
  const initialRouterConfig = isLoggedIn
    ? getLoggedInRoutes()
    : getLoggedOutRoutes();

  // Define routerConfig state and initialize it with the initial router config
  const [routerConfig, setRouterConfig] = useState(initialRouterConfig);

  useEffect(() => {
    // Update routerConfig when isLoggedIn value changes
    const config = isLoggedIn ? getLoggedInRoutes() : getLoggedOutRoutes();
    setRouterConfig(config);
  }, [isLoggedIn]);

  // Create BrowserRouter with the dynamically configured routerConfig
  const router = createBrowserRouter(routerConfig);

  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<App />);

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Layout />,
//     children: [
//       {
//         path: "",
//         element: <Home />,
//       },
//       {
//         path: "Ourexperts",
//         element: <OurExperts />,
//       },
//       {
//         path: "About",
//         element: <About />,
//       },
//       {
//         path: "Faqs",
//         element: <Faqs />,
//       },
//       {
//         path: "InterviewExperiences",
//         element: <IntExperiences />,
//       },
//       {
//         path: "Login/User",
//         element: <Login />,
//       },
//       {
//         path: "Login/Expert",
//         element: <Login />,
//       },
//       {
//         path: "Register/User",
//         element: <Register />,
//       },
//       {
//         path: "Register/Expert",
//         element: <Register />,
//       },
//       {
//         path: "User",
//         element: <User />,
//       },
//     ],
//   },
// ]);

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <RouterProvider router={router} />
//   </React.StrictMode>
// );
