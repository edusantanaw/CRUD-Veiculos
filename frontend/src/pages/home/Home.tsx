import React, { useState } from "react";
import Cars from "./components/Cars";
import Top from "./components/Top";
import { HomeContainer } from "./styles";

const Home = () => {
  return (
    <HomeContainer>
      <Top />
      <Cars />
    </HomeContainer>
  );
};

export default Home;
