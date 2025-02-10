import React, { Component, Fragment, useState } from "react";
import Home from "./components/Home";
import Navigate from "./components/Nav"
import { API_URL } from "./constants";

import axios from "axios";

class App extends Component {
  state = {
    materiaURL: API_URL + "principle",
    data: [],
  };

  changeMateria = (new_materia) => {
    this.setState(previous => ({
      materiaURL: API_URL + new_materia
    }));
    this.resetState();
  }

  getData = () => {
    axios.get(this.state.materiaURL).then(res => this.setState({ data: res.data }));
  };
  
  resetState = () => {
    this.getData();
  };

  componentDidMount() {
    this.resetState();
  }

  render() {
    return (
      <Fragment>
        <Navigate changeMateria={this.changeMateria}/>
        <Home 
          materiaData={this.state.data}
          resetState={this.resetState}/>
      </Fragment>
    );
  }
}


export default App;