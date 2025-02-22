import React, {useEffect, useState} from "react";
import { Col, Container, Row } from "reactstrap";
import GenericList from "./GenericList";
import NewMateriaModal from "./generics/NewMateriaModal";
import NewSkillModal from "./skill/NewSkillModal";
import axios from "axios";
import { API_URL } from "../constants";

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

  var newModal;
  if (materiaType.valueOf() === "principle" || materiaType.valueOf() === "skill_label") {
    newModal = (<NewMateriaModal create={true} resetState={resetState} materiaType={materiaType} />);
  } else if (materiaType.valueOf() === "skill" ) {
    newModal = (<NewSkillModal create={true} resetState={resetState} />);
  }

  return (
    <Container style={{ marginTop: "20px" }}>
      <Row>
        <Col>
          <GenericList data={materiaData} resetState={resetState} materiaType={materiaType}/>
        </Col>
      </Row>
      <Row>
        <Col>
          {newModal}
        </Col>
      </Row>
    </Container>
  );
}
