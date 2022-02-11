import React, { Component } from "react";
import { render } from "react-dom";
import HomePage from "./HomePage";

//import ReactDOM from "react-dom";

const App = () => {
  return <HomePage />;
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
