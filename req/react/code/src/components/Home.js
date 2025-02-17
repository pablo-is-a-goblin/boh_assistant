import React from "react";
import { Col, Container, Row } from "reactstrap";
import GenericList from "./GenericList";
import NewMateriaModal from "./NewMateriaModal";

export default function Home ({materiaData, resetState, materiaType}) {
  return (
    <Container style={{ marginTop: "20px" }}>
      <Row>
        <Col>
          <GenericList
            data={materiaData}
            resetState={resetState}
            materiaType={materiaType}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <NewMateriaModal create={true} resetState={resetState} materiaType={materiaType} />
        </Col>
      </Row>
    </Container>
  );
}
