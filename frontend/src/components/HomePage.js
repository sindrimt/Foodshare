import React, { Component } from "react";
import CreateRecipePage from "./CreateRecipePage";
import HomePageDisplay from "./HomePageDisplay";
import RecipeCreated from "./RecipeCreated";
import { BrowserRouter as Router, Routes, Route, Link, Redirect } from "react-router-dom";

const HomePage = () => {
    return (<Router>
        <Routes>
            <Route path="/" element={<HomePageDisplay />} />
            <Route path="/recipe" element={<CreateRecipePage />} />
            <Route path="recipe/created" element={<RecipeCreated />} />
        </Routes>
    </Router>);
}

export default HomePage;