import React from "react";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { Outlet } from "react-router-dom";
import Divider from "./components/Divider/Divider";
const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Divider/>
      <Footer />
    </>
  );
};

export default Layout;
