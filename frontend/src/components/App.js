import React, { useEffect, useState } from "react";
import { render } from "react-dom";
import HomePage from "./HomePage";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import styled from "styled-components";

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [logInSuccess, setLoginSuccess] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [isLiked, setIsLiked] = useState("");

  useEffect(() => {
    axios
      .get("api/accounts/profile/")
      .then((response) => {
        console.log("Du er logget inn!");
        setLoggedIn(true);
        setCurrentUser(response.data);
      })
      .catch((error) => {
        console.log(error.response);
        console.log("Du er IKKE logget inn");
        setLoggedIn(false);
        setCurrentUser(null);
      });
  }, []);

  return (
    <>
      <UserContext.Provider
        value={{
          loggedIn,
          setLoggedIn,
          logInSuccess,
          setLoginSuccess,
          setCurrentUser,
          currentUser,
          isLiked,
          setIsLiked,
        }}
      >
        <HomePage />
      </UserContext.Provider>
    </>
  );
};

const appDiv = document.getElementById("app");
render(<App />, appDiv);

export default App;
