import React, {useState, useEffect} from "react";
import axios from "axios";
import { API_URL } from "../../constants";
import { Col, Row, Container, Table } from "reactstrap";

export default function BookDetail({materiaType, materiaPk, changeMateria, changePk}) {
    const [materia, setMateria] = useState('');
    
    var mat_img;
    if (materia.image) {
        mat_img = <img className="materia-detail-img" src={materia.image} alt={materia.name}></img>;
    }

    useEffect(() => {   
        async function fetchMateria() {
            console.log("SI")
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
        <Container>
            {materia &&
            <Row>
            <Col xs="9">
                <h1>{materia.name}</h1>
                <i>{materia.description}</i>
            </Col>
            <Col xs="3">
                {mat_img}
                <Table>
                    <tbody>
                        <tr>
                            <th>Tally</th>
                            <td>{materia.tally}</td>
                        </tr>
                        <tr>
                            <th>Mistery</th>
                            <td>
                                {materia.dificulty}         
                                <button 
                                    className="button-as-link" 
                                    onClick={() => changeTo("principle", materia.mistery.pk)}>
                                    <img className="materia-label" src={materia.mistery.image} alt=""/>
                                {materia.mistery.name}</button>
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </Col>
            </Row>
            }
        </Container>
    );
}