import React from "react";
import { Col, Container, Row } from "reactstrap";
import PrincipleList from "./PrincipleList";
import NewPrincipleModal from "./NewPrincipleModal";

export default function Home ({materiaData, resetState}) {
  return (
    <Container style={{ marginTop: "20px" }}>
      <Row>
        <Col>
          <PrincipleList
            principles={materiaData}
            resetState={resetState}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <NewPrincipleModal create={true} resetState={resetState} />
        </Col>
      </Row>
    </Container>
  );
}
