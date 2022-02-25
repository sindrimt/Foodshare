import React, { useEffect } from "react";
import { render } from "react-dom";
import HomePage from "./HomePage";
import axios from "axios";

const App = () => {
  useEffect(() => {
    // Create context => lagre om man er logget inn i state (true eller false)
    //TODO Husk å set setLoggedIn til å være false når man logger ut
    axios
      .get("api/accounts/profile/")
      .then((response) => {
        console.log("Du er logget inn!");
        console.log(response);
      })
      .catch((error) => {
        console.log(error.response);
        console.log("Du er IKKE logget inn");
      });
  }, []);

  return (
    <>
      <HomePage />
    </>
  );
};

const appDiv = document.getElementById("app");
render(<App />, appDiv);

export default App;
