import React, { Component, Fragment } from "react";
import Home from "./components/Home";
import Navigate from "./components/Nav"

class App extends Component {
  render() {
    return (
      <Fragment>
        <Navigate />
        <Home />
      </Fragment>
    );
  }
}

export default App;