import React, { Component } from "react";
import { Col, Container, Row } from "reactstrap";
import PrincipleList from "./PrincipleList";
import NewPrincipleModal from "./NewPrincipleModal";

class Home extends Component {
  render() {
    return (
      <Container style={{ marginTop: "20px" }}>
        <Row>
          <Col>
            <PrincipleList
              principles={this.props.materiaData}
              resetState={this.props.resetState}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <NewPrincipleModal create={true} resetState={this.props.resetState} />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Home;