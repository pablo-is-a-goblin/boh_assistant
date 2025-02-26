import React, {useEffect, useState} from "react";
import { Col, Container, Row } from "reactstrap";
import GenericList from "./GenericList";
import axios from "axios";
import { API_URL, CONF } from "../constants";

export default function Home ({materiaType}) {
const [materiaData, setMateriaData] = useState([]);

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
      <Row>
        <Col>
          <GenericList data={materiaData} resetState={resetState} materiaType={materiaType}/>
        </Col>
      </Row>
      <Row>
        <Col>
          <NewModal create={true} resetState={resetState} materiaType={materiaType}/>
        </Col>
      </Row>
    </Container>
  );
}
