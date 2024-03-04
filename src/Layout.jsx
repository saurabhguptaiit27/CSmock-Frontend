import React from "react";
import Header from "./components/Header/Header.jsx";
import User from "./components/User/User.jsx";
import Footer from "./components/Footer/Footer.jsx";
import { Outlet } from "react-router-dom";
import Divider from "./components/Divider/Divider.jsx";
import { useState } from "react";

const Layout = () => {
  const [selectedButton, setSelectedButton] = useState("User");
  const [isloggedIn, setIsLoggedIn] = useState(true);
  const [toggleProfile, setToggleProfile] = useState(true);

  const handleButtonClick = (button) => {
    setSelectedButton(button);
  };
  const handleToggleProfile = () => {
    setToggleProfile(!toggleProfile);
  };
  const handleLogoutButton = () => {
    setIsLoggedIn(!isloggedIn);
  };

  return (
    <>
      <Header
        handleButtonClick={handleButtonClick}
        handleToggleProfile={handleToggleProfile}
        handleLogoutButton={handleLogoutButton}
        isloggedIn={isloggedIn}
        setIsLoggedIn={setIsLoggedIn}
      />
      {toggleProfile && isloggedIn && (
        <User handleLogoutButton={handleLogoutButton} />
      )}
      <Outlet
        context={[selectedButton, setSelectedButton, handleButtonClick]}
      />

      <Divider />
      <Footer />
    </>
  );
};

export default Layout;
