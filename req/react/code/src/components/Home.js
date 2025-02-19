import React, {useEffect, useState} from "react";
import { Col, Container, Row } from "reactstrap";
import GenericList from "./GenericList";
import NewMateriaModal from "./NewMateriaModal";
import SkillList from "./skill/SkillList";
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
    console.log(response.data);
    setMateriaData(response.data);
  };

  var list;
  var newModal;
  if (materiaType.valueOf() === "principle") {
    list = (<GenericList
      data={materiaData}
      resetState={resetState}
      materiaType={materiaType}
      />);
      
    newModal = (<NewMateriaModal create={true} resetState={resetState} materiaType={materiaType} />);
  }
  if (materiaType.valueOf() === "skill" ) {
    list = (<SkillList
      data={materiaData}
      resetState={resetState}
      />);
      
    newModal = (<NewMateriaModal create={true} resetState={resetState} materiaType={materiaType} />);
  }

  return (
    <Container style={{ marginTop: "20px" }}>
      <Row>
        <Col>
          {list}
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
