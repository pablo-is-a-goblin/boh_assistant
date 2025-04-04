import React, {useState, useEffect} from "react";
import axios from "axios";
import { API_URL, CONF } from "../../constants";
import { Col, Row, Container } from "reactstrap";
import PrincipleAcordion from "./PrincipleAcordion";
import TongueAcordion from "./TongueAcordion";
import SkillLabelAcordion from "./SkillLabelAcordion";
import ObjectLabelAcordion from "./ObjectLabelAcordion";

export default function GenericDetail({materiaType, materiaPk, changeMateria, changePk}) {
    const [materia, setMateria] = useState('');
    const NewModal = CONF[materiaType].modal;
    
    async function getMateria() {
        let response = await axios.get(API_URL + materiaType + "/" + materiaPk + "/");
        setMateria(response.data);
    }

    useEffect(() => {getMateria();}, []);

    var MateriaAcc;
    if (materiaType === "principle") {
        MateriaAcc = PrincipleAcordion;
    } else if (materiaType === "tongue") {
        MateriaAcc = TongueAcordion;
    } else if (materiaType === "skill_label") {
        MateriaAcc = SkillLabelAcordion;
    } else {
        MateriaAcc = ObjectLabelAcordion;
    }

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
            <MateriaAcc 
                materia={materia}
                changeTo={changeTo}
            />
        </Container>
    );
}