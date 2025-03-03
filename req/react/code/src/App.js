import React, { Fragment, useState } from "react"
import Home from "./components/Home";
import Navigate from "./components/Nav";
import { CONF } from "./constants";

export default function App () {
  const [materiaType, setMateriaType] = useState("principle");
  const [materiaPk, setMateriaPk] = useState("");
 
  function changeMateria(new_materia) {
    setMateriaType(new_materia);
  }

  function changePk(new_pk) {
    setMateriaPk(new_pk);
  }


  var MainPage;
  if (materiaPk !== "") {
    MainPage = CONF[materiaType].detail;
    MainPage = <MainPage 
    materiaType={materiaType} 
    materiaPk={materiaPk}
    changeMateria={changeMateria}
    changePk={changePk}/>
  }  else
    MainPage = <Home
    key={materiaType}
    materiaType={materiaType}
    changePk={changePk}/>

  return (
    <Fragment>
      <Navigate 
        changeMateria={changeMateria}
        changePk={changePk}
        materiaType={materiaType}/>
      {MainPage}
    </Fragment>
  );
}