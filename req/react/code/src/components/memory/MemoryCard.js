import React from "react";
import { Card, CardBody, CardFooter, CardTitle, CardText, ButtonGroup } from "reactstrap";
import NewMemoryModal from "./NewMemoryModal";
import ConfirmRemovalModal from "../ConfirmRemovalModal";

export default function MemoryCard({materia, materiaType, resetState}) {
return (
    <Card>
        <img src={materia.image} alt={materia.name}></img>
        <CardBody>
            <CardTitle tag="h2">{materia.name}</CardTitle>
            <CardText tag="i">{materia.description}</CardText>
            {materia.principles.map(principle => (
            <CardText>
                <img src={principle.principle.image} alt={principle.principle.name} />
                {principle.qty}
            </CardText>
            ))}
            <CardText>
             {materia.aspects.map(aspect => <img src={aspect.image} alt={aspect.name} />)}
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