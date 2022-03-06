import React, { Component, useState, useEffect, useContext } from "react";
import CreateRecipePage from "./CreateRecipePage";
import HomePageDisplay from "./HomePageDisplay";
import RecipeCreated from "./RecipeCreated";
import Navbar from "./Navbar";
import CardContainer from "./CardContainer";
import LoginPage from "./LoginPage";
import RegisterUser from "./RegisterUser";
import UserCreated from "./UserCreated";
import NotFound from "./pages/NotFound";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Redirect,
} from "react-router-dom";

const HomePage = () => {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePageDisplay />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/recipe" element={<CreateRecipePage />} />
          <Route path="recipe/created" element={<RecipeCreated />} />
          <Route path="register/user-created" element={<UserCreated />} />
          <Route path="/browse-recipes" element={<CardContainer />} />
          <Route path="/register" element={<RegisterUser />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
};

export default HomePage;
