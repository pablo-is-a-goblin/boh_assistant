import React, {useState, useEffect} from "react";
import axios from "axios";
import { API_URL } from "../../constants";
import { Col, Row, Container, Table } from "reactstrap";

export default function MemoryDetail({materiaType, materiaPk, changeMateria, changePk}) {
    const [materia, setMateria] = useState("");

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

    return (
        materia &&
        <Container>
            <Row>
            <Col xs="9">
                <h1>{materia.name}</h1>
                <i>{materia.description}</i>
            </Col>
            <Col xs="3">
                <img className="materia-detail-img" src={materia.image} alt={materia.name} />
            <Table>
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
                </tbody>
            </Table>
            </Col>
            </Row>
        </Container>
    );
}