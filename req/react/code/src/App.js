import React, { Fragment, useState } from "react"
import Home from "./components/Home";
import Navigate from "./components/Nav"
import { API_URL } from "./constants";

import axios from "axios";

export default function App () {
  const [materiaType, setMateriaType] = useState("principle");
  const [materiaData, setMateriaData] = useState([]);

  function changeMateria(new_materia) {
    setMateriaType(new_materia);
    resetState();
  }

  async function getData() {
    let response = await axios.get(API_URL + materiaType);
    console.log(response.data);
    setMateriaData(response.data);
  };
  
  function resetState() {
    getData();
  };

  if (materiaData === undefined || materiaData.length === 0)
    getData();
  return (
    <Fragment>
      <Navigate changeMateria={changeMateria}/>
      <Home 
        materiaData={materiaData}
        resetState={resetState}/>
    </Fragment>
  );
}