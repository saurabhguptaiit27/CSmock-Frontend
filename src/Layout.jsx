import React, { useContext } from "react";
import Header from "./components/Header/Header.jsx";
import User from "./components/User/User.jsx";
import Footer from "./components/Footer/Footer.jsx";
import { Outlet } from "react-router-dom";
import Divider from "./components/Divider/Divider.jsx";
import { AuthContext } from "./components/Context/AuthProvider.jsx";
import AvailabilityUI from "./components/AvailabilityUI/AvailabilityUI.jsx";

const Layout = () => {
  const { isLoggedIn, userType, isAvailabilityUI, toggleProfile } =
    useContext(AuthContext);

  return (
    <>
      <Header />
      {toggleProfile && isLoggedIn && <User />}
      {isLoggedIn && userType === "Expert" && isAvailabilityUI && (
        <AvailabilityUI />
      )}
      <Outlet />
      <Divider />
      <Footer />
    </>
  );
};

export default Layout;
