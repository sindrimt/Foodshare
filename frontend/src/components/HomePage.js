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

import { useHistory } from "react-router";

const HomePage = () => {
  /*  const [url, setUrl] = useState(window.location.pathname);
  console.log(url); */

  const history = useHistory();

  useEffect(() => {
    return history.listen((location) => {
      console.log(`You changed the page to: ${location.pathname}`);
    });
  }, [history]);

  return (
    <>
      <Router>
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
