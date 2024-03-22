import React, { useContext } from "react";
import Header from "./components/Header/Header.jsx";
import Sidebar from "./components/Header/Sidebar.jsx";
import User from "./components/User/User.jsx";
import Footer from "./components/Footer/Footer.jsx";
import { Outlet } from "react-router-dom";
import { AuthContext } from "./components/Context/AuthProvider.jsx";
import AvailabilityUI from "./components/AvailabilityUI/AvailabilityUI.jsx";
import { ToggleUIContext } from "./components/Context/ToggleUiProvider.jsx";
import ChatSupportButton from "./chat/ChatSupportButton.jsx";
import ChatSupportUI from "./chat/ChatSupportUI.jsx";


const Layout = () => {
  const { isLoggedIn, userType } = useContext(AuthContext);
  const { isAvailabilityUI, toggleProfile, toggleMenu,toggleChat } =
    useContext(ToggleUIContext);
    

  return (
    <>
      <Header />
      {toggleMenu && <Sidebar />}
      {toggleProfile && isLoggedIn && <User />}
      {isLoggedIn && userType === "Expert" && isAvailabilityUI && (
        <AvailabilityUI />
      )}
      <Outlet />
      {toggleChat && <ChatSupportUI />}
      <ChatSupportButton />
      <Footer />
    </>
  );
};

export default Layout;
