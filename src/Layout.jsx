import React from "react";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { Outlet } from "react-router-dom";
import Divider from "./components/Divider/Divider";
import { useState } from "react";

const Layout = () => {
  const [selectedButton, setSelectedButton] = useState("User");
  const [isloggedIn, setIsLoggedIn] = useState(false);

  const handleButtonClick = (button) => {
    setSelectedButton(button);
  };

  return (
    <>
      <Header
        handleButtonClick={handleButtonClick}
        isloggedIn={isloggedIn}
        setIsLoggedIn={setIsLoggedIn}
      />
      <Outlet
        context={[selectedButton, setSelectedButton, handleButtonClick]}
      />
      <Divider />
      <Footer />
    </>
  );
};

export default Layout;
