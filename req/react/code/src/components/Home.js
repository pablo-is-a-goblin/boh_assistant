import React, {useEffect, useState} from "react";
import { Container, Row } from "reactstrap";
import GenericList from "./GenericList";
import axios from "axios";
import { API_URL, CONF } from "../constants";
import SortButton from "./SortButton";

export default function Home ({materiaType, changePk, changeType}) {
const [materiaData, setMateriaData] = useState([]);
const [sort, setSort] = useState("name");

  useEffect(() => {
    axios.get(API_URL + materiaType).then(response => setMateriaData(response.data));
  }, [materiaType]);

  function resetState() {
    getData();
  };

  async function getData() {
    let response = await axios.get(API_URL + materiaType);
    setMateriaData(response.data);
  };

  var NewModal = CONF[materiaType].modal;

  return (
    <Container style={{ marginTop: "20px" }}>
      <Container>
      <Row className="fixed-top" key="new" style={{ marginTop: "60px" }}>
          <NewModal create={true} resetState={resetState} materiaType={materiaType}/>
          <SortButton setSort={setSort} materiaExample={materiaData[0]} />
      </Row>

      </Container>
      <Row style={{ marginTop: "50px" }} key="list">
          <GenericList 
            sort={sort}
            data={materiaData}
            resetState={resetState}
            materiaType={materiaType}
            changePk={changePk}
            changeType={changeType}/>
      </Row>
    </Container>
  );
}
