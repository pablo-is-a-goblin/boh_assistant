import React, { Component } from "react";
import { Col, Container, Row } from "reactstrap";
import PrincipleList from "./PrincipleList";
import NewPrincipleModal from "./NewPrincipleModal";

import axios from "axios";

import { API_URL } from "../constants";

class Home extends Component {
  state = {
    principles: []
  };

  componentDidMount() {
    this.resetState();
  }

  getPrinciples = () => {
    axios.get(API_URL).then(res => this.setState({ principles: res.data }));
  };

  resetState = () => {
    this.getPrinciples();
  };

  render() {
    return (
      <Container style={{ marginTop: "20px" }}>
        <Row>
          <Col>
            <PrincipleList
              principles={this.state.principles}
              resetState={this.resetState}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <NewPrincipleModal create={true} resetState={this.resetState} />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Home;