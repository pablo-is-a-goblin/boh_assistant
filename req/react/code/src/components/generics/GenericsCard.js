import React from "react";
import { Card, CardBody, CardFooter, CardTitle, CardText, ButtonGroup } from "reactstrap";
import NewMateriaModal from "./NewMateriaModal";
import ConfirmRemovalModal from "../ConfirmRemovalModal";

export default function GenericsCard ({materia, materiaType, resetState}) {
    return (
<Card>
    <img src={materia.image} alt={materia.name}></img>
    <CardBody>
        <CardTitle tag="h2">{materia.name}</CardTitle>
        <CardText tag="i">{materia.description}</CardText>
    </CardBody>
    <CardFooter>
        <ButtonGroup>
               <NewMateriaModal
            create={false}
            materia={materia}
            resetState={resetState}
            materiaType={materiaType}
            />
          &nbsp;&nbsp;
              <ConfirmRemovalModal
            pk={materia.pk}
            resetState={resetState}
            materiaType={materiaType}
            />
        </ButtonGroup>
    </CardFooter>
</Card>
);}