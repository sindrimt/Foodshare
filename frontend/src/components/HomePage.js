import React, { Component, useState, useEffect, useContext } from "react";
import CreateRecipePage from "./CreateRecipePage";
import HomePageDisplay from "./HomePageDisplay";
import RecipeCreated from "./RecipeCreated";
import Navbar from "./Navbar";
import CardContainer from "./CardContainer";
import LoginPage from "./LoginPage";
import RegisterUser from "./RegisterUser";
import UserCreated from "./UserCreated";
import Profile from "./Profile";
import NotFound from "../pages/NotFound";
import ProfilePage from "../pages/ProfilePage";
import LikedRecipes from "./LikedRecipes";
import MyProfile from "./MyProfile";
import EditRecipe from "./EditRecipe";

import { BrowserRouter as Router, Routes, Route, Link, Redirect } from "react-router-dom";

const HomePage = () => {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<CardContainer />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/recipe"
            element={<CreateRecipePage title="test" summary="test" content="tomat" prep_time="1" tags="middag" />}
          />
          <Route path="/recipe/:id" element={<EditRecipe title="test" />} />
          <Route path="recipe/created" element={<RecipeCreated />} />
          <Route path="register/user-created" element={<UserCreated />} />
          <Route path="/browse" element={<CardContainer />} />
          <Route path="/register" element={<RegisterUser />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/me/:id" element={<ProfilePage />} />
          <Route path="/me" element={<MyProfile />} />
          <Route path="/me/liked-recipes" element={<LikedRecipes />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
};
export default HomePage;
