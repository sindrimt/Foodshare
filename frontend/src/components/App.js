import React, { Component } from "react";
import { render } from "react-dom";
import CardContainer from "./CardContainer";
import HomePage from "./HomePage";
import Navbar from "./Navbar";

//import ReactDOM from "react-dom";

const App = () => {
  return (
    <>
      {/* <Navbar /> */}
      <HomePage/>
    </>
  );
};

/*export default class App extends Component {
  Constructor(props) {
    super(props);
  }

  render() {
    return <h1>Welcome to the NEW FoodShare!</h1>;
  }
} */

const appDiv = document.getElementById("app");
render(<App />, appDiv);

export default App;
