import React from "react";
import { Card, CardBody, CardFooter, CardTitle, CardText, ButtonGroup, Button } from "reactstrap";
import NewSkillModal from "./NewSkillModal";
import ConfirmRemovalModal from "../ConfirmRemovalModal";

export default function SkillsCard({materia, materiaType, resetState, changePk}) {
return (
    <Card className="materia-card-img">
        <img src={materia.image} alt={materia.name}></img>
        <CardBody>
            <CardTitle tag="h2">{materia.name}</CardTitle>
            <CardText tag="i">{materia.description}</CardText>
            <CardText className="text-center"><img className="materia-label" src={materia.principle1.image} alt={materia.principle1.name}></img>
            <img className="materia-label" src={materia.principle2.image} alt={materia.principle2.name}></img>
            </CardText>
            <CardText className="text-center">
            {materia.aspects.map(aspect => <img className="materia-label" src={aspect.image} alt={aspect.name}></img>)}
            </CardText>
        </CardBody>
        <CardFooter>
            <ButtonGroup>
                <NewSkillModal
                create={false}
                materia={materia}
                resetState={resetState}
                />
            &nbsp;&nbsp;
            <Button onClick={() => changePk(materia.pk)}>
                See Detail
            </Button>
            &nbsp;&nbsp;
                <ConfirmRemovalModal
                pk={materia.pk}
                resetState={resetState}
                materiaType="skill"
                name={materia.name}
                />
            </ButtonGroup>
        </CardFooter>
    </Card>
);}