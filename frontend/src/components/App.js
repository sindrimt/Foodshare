import React, { Component } from "react";
import { render } from "react-dom";
//import ReactDOM from "react-dom";

const App = () => {
  return <h1>React hei Boyus</h1>;
};

const appDiv = document.getElementById("app");
render(<App />, appDiv);

export default App;
