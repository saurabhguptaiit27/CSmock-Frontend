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
import { useContext } from "react";
import { AuthContext } from "./components/Context/AuthProvider.jsx";
import { SelectedButtonProvider } from "./components/Context/SelectedButtonProvider.jsx";
import { CurrentUserProvider } from "./components/Context/CurrentUserProvider.jsx";

const App = () => {
  const { isLoggedIn } = useContext(AuthContext);

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
          element: isLoggedIn && <Booking />,
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
            <App />
          </CurrentUserProvider>
        </SelectedButtonProvider>
      </AllExpertsProvider>
    </AuthProvider>
  </>
);

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
//         element: <RegisterExpert />,
//       },
//       {
//         path: "Booking",
//         element: <Booking />,
//       },
//     ],
//   },
// ]);

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <AuthProvider>
//       <RouterProvider router={router} />
//     </AuthProvider>
//   </React.StrictMode>
// );

// const App = () => {
//   // const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

//   const isLoggedIn = false;

//   // Define functions to get router config based on isLoggedIn value
//   const getLoggedInRoutes = () => {
//     return [
//       {
//         path: "/",
//         element: <Layout />,
//         children: [
//           { path: "", element: <Home /> },
//           { path: "about", element: <About /> },
//           { path: "ourexperts", element: <OurExperts /> },
//           { path: "interviewexperiences", element: <IntExperiences /> },
//           { path: "FAQs", element: <Faqs /> },
//         ],
//       },
//     ];
//   };

//   const getLoggedOutRoutes = () => {
//     return [
//       {
//         path: "/",
//         element: <Layout />,
//         children: [
//           { path: "", element: <Home /> },
//           { path: "about", element: <About /> },
//           { path: "ourexperts", element: <OurExperts /> },
//           { path: "interviewexperiences", element: <IntExperiences /> },
//           { path: "FAQs", element: <Faqs /> },
//           { path: "Login/User", element: <Login /> },
//           { path: "Login/Expert", element: <Login /> },
//           { path: "Register/User", element: <Register /> },
//           { path: "Register/Expert", element: <Register /> },
//         ],
//       },
//     ];
//   };

//   // Define initial router config based on isLoggedIn value
//   const initialRouterConfig = isLoggedIn
//     ? getLoggedInRoutes()
//     : getLoggedOutRoutes();

//   // Define routerConfig state and initialize it with the initial router config
//   const [routerConfig, setRouterConfig] = useState(initialRouterConfig);

//   useEffect(() => {
//     // Update routerConfig when isLoggedIn value changes
//     const config = isLoggedIn ? getLoggedInRoutes() : getLoggedOutRoutes();
//     setRouterConfig(config);
//   }, [isLoggedIn]);

//   // Create BrowserRouter with the dynamically configured routerConfig
//   const router = createBrowserRouter(routerConfig);

//   return (
//     <React.StrictMode>
//       <AuthProvider>
//         <RouterProvider router={router} />
//       </AuthProvider>
//     </React.StrictMode>
//   );
// };

// ReactDOM.createRoot(document.getElementById("root")).render(<App />);
