import React, {useState, useEffect} from "react";
import axios from "axios";
import { API_URL, CONF } from "../../constants";
import { Col, Row, Container } from "reactstrap";

export default function GenericDetail({materiaType, materiaPk, changeMateria, changePK}) {
    const [materia, setMateria] = useState('');
    const NewModal = CONF[materiaType].modal;
    
    async function getMateria() {
        let response = await axios.get(API_URL + materiaType + "/" + materiaPk + "/");
        setMateria(response.data);
    }

    useEffect(() => {getMateria();}, []);

    return (
        materia &&
        <Container>
            <Row>
            <Col xs="9">
                <h1>{materia.name}</h1>
                <i>{materia.description}</i>
            </Col>
            <Col xs="3">
                <img className="materia-detail-img mx-auto d-block" src={materia.image} alt={materia.name} />
                <Row>
                    <NewModal
                create={false}
                materia={materia}
                resetState={getMateria}
                materiaType={materiaType}
                />
                </Row>
            </Col>
            </Row>
        </Container>
    );
}