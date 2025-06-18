import React, {useState, useEffect} from "react";
import axios from "axios";
import { API_URL, CONF } from "../../constants";
import { Col, Row, Container, Table } from "reactstrap";
import MemoryAcordion from "./MemoryAcordion";

export default function MemoryDetail({materiaType, materiaPk, changeMateria, changePk}) {
    const [materia, setMateria] = useState("");
    const NewModal = CONF[materiaType].modal;

    useEffect(() => {   
        async function fetchMateria() {
            const response = await axios.get(API_URL + materiaType + "/" + materiaPk + "/");
            setMateria(response.data);
        }
        fetchMateria();
    }, [])

    function changeTo(type, pk) {
        changeMateria(type);
        changePk(pk);
    }

    function fetchData() {
    axios.get(API_URL + materiaType + "/" + materiaPk + "/").then(response => setMateria(response.data));    
    }

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
                resetState={fetchData}
                materiaType={materiaType}
                />
                </Row>
            <Table>
                <thead>
                    <tr>
                        <th colspan="2" className="text-center">Principles & other Aspects</th>
                    </tr>
                </thead>
                <tbody>
                    {materia.principles.map(principle =>
                        <tr>
                            <th> <button 
                                    className="button-as-link" 
                                    onClick={() => changeTo("principle", principle.principle.pk)}>
                                    <img className="materia-label" src={principle.principle.image} alt=""/>
                                    {principle.principle.name}
                            </button></th>
                            <td>{principle.qty}</td>
                        </tr>
                    )}
                    {materia.aspects.map(aspect =>
                        <tr>
                            <th colspan="2" className="text-center"> <button 
                                    className="button-as-link" 
                                    onClick={() => changeTo("object_label", aspect.pk)}>
                                    <img className="materia-label" src={aspect.image} alt=""/>
                                    {aspect.name}
                            </button></th>
                        </tr>
                    )}
                </tbody>
            </Table>
            </Col>
            </Row>
            <MemoryAcordion 
                materia={materia}
                changeTo={changeTo}
            /> 
        </Container>
    );
}