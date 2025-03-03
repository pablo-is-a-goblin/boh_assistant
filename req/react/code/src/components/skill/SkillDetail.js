import React, {useState, useEffect} from "react";
import axios from "axios";
import { API_URL } from "../../constants";
import { Col, Row, Container, Table, Accordion, AccordionItem, AccordionHeader, AccordionBody } from "reactstrap";

export default function SkillDetail({materiaType, materiaPk, changeMateria, changePk}) {
    const [materia, setMateria] = useState('');
    const [open, setOpen] = useState();

    const toggle = (id) => {
      if (open === id) {
        setOpen();
      } else {
        setOpen(id);
      }
    };

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
        <Col xs="8">
            <h1>{materia.name}</h1>
            <i>{materia.description}</i>
        </Col>
        <Col xs="3">
            <img className="materia-detail-img mx-auto d-block" src={materia.image} alt={materia.name} />
            <Table>
                <tbody>
                    <tr>
                        <th>Primary principle</th>
                        <td><button 
                                className="button-as-link" 
                                onClick={() => changeTo("principle", materia.principle1.pk)}>
                                <img className="materia-label" src={materia.principle1.image} alt=""/>
                            {materia.principle1.name}
                        </button></td>
                    </tr>
                    <tr>
                        <th>Secondary principle</th>
                        <td><button 
                                className="button-as-link" 
                                onClick={() => changeTo("principle", materia.principle2.pk)}>
                                <img className="materia-label" src={materia.principle2.image} alt=""/>
                            {materia.principle2.name}
                        </button></td>
                    </tr>
                </tbody>
            </Table>
        </Col>
        </Row>
        <Accordion open={open} toggle={toggle}>
        <AccordionItem>
          <AccordionHeader targetId="1">Wisdom text</AccordionHeader>
          <AccordionBody accordionId="1">
            <p>
            {materia.wisdom1}
            </p>
          </AccordionBody>
        </AccordionItem>
        <AccordionItem>
          <AccordionHeader targetId="2">Other Wisdom Text</AccordionHeader>
          <AccordionBody accordionId="2">
            {materia.wisdom2}
          </AccordionBody>
        </AccordionItem>
        </Accordion>
        </Container>
    );
}