import React, { Component } from "react";
import NavBar from "./components/navbar";
import Playground from "./components/playground";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar />
        <hr className="Line-2" />
        <Playground />
      </div>
    );
  }
}

export default App;
