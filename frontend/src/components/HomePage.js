import React, { Component } from "react";
import CreateRecipePage from "./CreateRecipePage";
import { BrowserRouter as Router, Routes, Route, Link, Redirect } from "react-router-dom";

const HomePage = () => {
    return
    (<Router>
        <Routes>
            <Route path="/"><p>This is the homepage</p></Route>
            <Route path="/recipe" element={<CreateRecipePage />} />
        </Routes>
    </Router>);
}

export default HomePage;