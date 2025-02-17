import React, { Fragment, useState, useEffect } from "react"
import Home from "./components/Home";
import Navigate from "./components/Nav"
import { API_URL } from "./constants";

import axios from "axios";

export default function App () {
  const [materiaType, setMateriaType] = useState("principle");
  const [materiaData, setMateriaData] = useState([]);
 
// mounted
  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    getData();
  }, [materiaType]);

  function changeMateria(new_materia) {
    setMateriaType(new_materia);
  }

  async function getData() {
    let response = await axios.get(API_URL + materiaType);
    console.log(response.data);
    setMateriaData(response.data);
  };
  
  function resetState() {
    getData();
  };

  return (
    <Fragment>
      <Navigate changeMateria={changeMateria}/>
      <Home 
        materiaData={materiaData}
        resetState={resetState}/>
    </Fragment>
  );
}