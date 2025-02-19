import React, { Fragment, useState } from "react"
import Home from "./components/Home";
import Navigate from "./components/Nav"

export default function App () {
  const [materiaType, setMateriaType] = useState("principle");
 
  function changeMateria(new_materia) {
    setMateriaType(new_materia);
  }

  return (
    <Fragment>
      <Navigate changeMateria={changeMateria}/>
      <Home
        key={materiaType}
        materiaType={materiaType}/>
    </Fragment>
  );
}