import React from "react";
import { Card, CardBody, CardFooter, CardTitle, CardText, ButtonGroup, Button } from "reactstrap";
import NewMemoryModal from "./NewMemoryModal";
import ConfirmRemovalModal from "../ConfirmRemovalModal";

export default function MemoryCard({materia, materiaType, resetState, changePk}) {
return (
    <Card className="materia-card-img">
        <img src={materia.image} alt={materia.name}></img>
        <CardBody>
            <CardTitle tag="h2">{materia.name}</CardTitle>
            <CardText tag="i">{materia.description}</CardText>
            <CardText tag="h3" className="text-center">
            {materia.principles.map(principle => (
                <>
                <img className="materia-label" src={principle.principle.image} alt={principle.principle.name} />{principle.qty}
                <i className="bi bi-bar-chart text-info" style={{ fontSize: 40 }}></i>
                </>
            ))}
            </CardText>
            <CardText className="text-center">
             {materia.aspects.map(aspect => <img className="materia-label" src={aspect.image} alt={aspect.name} />)}
            </CardText>
        </CardBody>
        <CardFooter>
            <ButtonGroup>
                <NewMemoryModal
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
                materiaType="memory"
                name={materia.name}
                />
            </ButtonGroup>
        </CardFooter>
    </Card>
);}