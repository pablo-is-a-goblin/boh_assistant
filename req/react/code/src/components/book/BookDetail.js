import React, {useState, useEffect} from "react";
import axios from "axios";
import { API_URL, CONF } from "../../constants";
import { Col, Row, Container, Table, Accordion, AccordionBody, AccordionHeader, AccordionItem } from "reactstrap";

export default function BookDetail({materiaType, materiaPk, changeMateria, changePk}) {
    const [materia, setMateria] = useState('');
    const [open, setOpen] = useState();
    const NewModal = CONF[materiaType].modal;

    const toggle = (id) => {
      if (open === id) {
        setOpen();
      } else {
        setOpen(id);
      }
    };
    
    var mat_img;
    if (materia.image) {
        mat_img = <img className="materia-detail-img mx-auto d-block" src={materia.image} alt={materia.name}></img>;
    }

    function fetchData() {
    axios.get(API_URL + materiaType + "/" + materiaPk + "/").then(response => setMateria(response.data));    
    }

    useEffect(() => {   
        axios.get(API_URL + materiaType + "/" + materiaPk + "/").then(response => setMateria(response.data));    
    }, [])

    function changeTo(type, pk) {
        changeMateria(type);
        changePk(pk);
    }

    var book_lang;
    if (materia.tongue) {
        book_lang = (
            <p className="text-center">
                Written in <button 
                    className="button-as-link" 
                    onClick={() => changeTo("tongue", materia.tongue.pk)}>
                    <img className="materia-label" src={materia.tongue.image} alt=""/>
                    {materia.tongue.name}
                </button>
            </p>
        )
    }

    var book_memory;
    if (materia.memory) {
        book_lang = (
            <p className="text-center">
                Read to produce <button 
                    className="button-as-link" 
                    onClick={() => changeTo("memory", materia.memory.pk)}>
                    <img className="materia-label" src={materia.memory.image} alt=""/>
                    {materia.memory.name}
                </button>
            </p>
        )
    }

    return (
        materia &&
        <Container>
            <Row>
            <Col xs="9">
                <h1>{materia.name} - {materia.abv}</h1>
                <i>{materia.description}</i>
            </Col>
            <Col xs="3">
                {mat_img}
                <Row>
                    <NewModal
                create={false}
                materia={materia}
                resetState={fetchData}
                materiaType={materiaType}
                />
                </Row>
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
                {book_lang}
                {book_memory}
            </Col>
            </Row>
        <Accordion open={open} toggle={toggle}>
        <AccordionItem>
          <AccordionHeader targetId="1">I'm Reading...</AccordionHeader>
          <AccordionBody accordionId="1">
            <p>
            {materia.reading}
            </p>
          </AccordionBody>
        </AccordionItem>
        <AccordionItem>
          <AccordionHeader targetId="2">I've Read...</AccordionHeader>
          <AccordionBody accordionId="2">
            {materia.read}
          </AccordionBody>
        </AccordionItem>
        </Accordion>
        </Container>
    );
}