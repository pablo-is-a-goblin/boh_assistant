import React, {useState, useEffect} from "react";
import axios from "axios";
import { API_URL } from "../../constants";
import { Col, Row, Container } from "reactstrap";

export default function BookDetail({materiaType, materiaPk, changeMateria, changePK}) {
    const [data, setData] = useState([]);

    async function getData() {
        let response = await axios.get(API_URL + materiaType + "/" + materiaPk + "/");
        setData(response.data);
    }

    useEffect(() => {getData();}, []);

    return (
        <Container>
            <Row>
            <Col xs="9">
                <h1>{data.name}</h1><bk/>
                <i>{data.description}</i>
            </Col>
            <Col xs="3">
                <img className="materia-detail-img" src={data.image} alt={data.name} />
            </Col>
            </Row>
        </Container>
    );
}