import React, { Component, useState, useEffect } from "react";
import CreateRecipePage from "./CreateRecipePage";
import HomePageDisplay from "./HomePageDisplay";
import RecipeCreated from "./RecipeCreated";
import Navbar from "./Navbar";
import CardContainer from "./CardContainer";
import LoginPage from "./LoginPage";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Redirect,
} from "react-router-dom";

const HomePage = () => {
  /*  const [url, setUrl] = useState(window.location.pathname);
  console.log(url); */

  return (
    <>
      <Router>
        {/* {url != "/login" && <Navbar />} Vis navbar alle steder utenom på login page*/}
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePageDisplay />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/recipe" element={<CreateRecipePage />} />
          <Route path="recipe/created" element={<RecipeCreated />} />
          <Route path="/browse-recipes" element={<CardContainer />} />
        </Routes>
      </Router>
    </>
  );
};

export default HomePage;
