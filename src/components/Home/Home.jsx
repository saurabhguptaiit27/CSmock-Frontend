import React from "react";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthProvider";
import Home1 from "./Home1";
import Home2 from "./Home2";
import Home3 from "./Home3";
import Home4 from "./Home4";
import Home5 from "./Home5";

const Home = () => {
  const { userType } = useContext(AuthContext);

  return (
    <>
      <Home1 />
      <Home2 />
      {userType === "User" && <Home3 />}
      <Home4 />
      <Home5 />
    </>
  );
};

export default Home;
