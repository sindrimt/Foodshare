import React, { Component } from "react";
import { render } from "react-dom";
//import ReactDOM from "react-dom";

export default function App() {
  return <h1>Testing React halo mattias</h1>;
}

const appDiv = document.getElementById("app");
render(<App />, appDiv);
