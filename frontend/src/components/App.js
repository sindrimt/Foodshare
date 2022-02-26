import React, { useEffect, useState } from "react";
import { render } from "react-dom";
import HomePage from "./HomePage";
import axios from "axios";
import { UserContext } from "../context/UserContext";

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [logInSuccess, setLoginSuccess] = useState(false);
  useEffect(() => {
    // Create context => lagre om man er logget inn i state (true eller false)
    //TODO Husk å set setLoggedIn til å være false når man logger ut
    axios
      .get("api/accounts/profile/")
      .then((response) => {
        console.log("Du er logget inn!");
        console.log(response);
        setLoggedIn(true);
      })
      .catch((error) => {
        console.log(error.response);
        console.log("Du er IKKE logget inn");
        setLoggedIn(false);
      });
  }, []);

  return (
    <>
      <UserContext.Provider
        value={{ loggedIn, setLoggedIn, logInSuccess, setLoginSuccess }}
      >
        <HomePage />
      </UserContext.Provider>
    </>
  );
};

const appDiv = document.getElementById("app");
render(<App />, appDiv);

export default App;
