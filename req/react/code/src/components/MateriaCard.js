import React from "react";
import { Card, CardBody, CardFooter, ButtonGroup, Button } from "reactstrap";
import ConfirmRemovalModal from "./ConfirmRemovalModal";
import { CONF } from "../constants";

export default function MateriaCard ({materia, materiaType, resetState, changePk}) {
    const NewModal = CONF[materiaType].modal;
    const CardContent = CONF[materiaType].card;

    var mat_img;
    if (materia.image) {
        mat_img = <img src={materia.image} alt={materia.name}></img>;
    }

    return (
<Card className="materia-card-img">
    {mat_img}
    <CardBody>
        <CardContent materia={materia}/>
    </CardBody>
    <CardFooter>
        <ButtonGroup>
               <NewModal
            create={false}
            materia={materia}
            resetState={resetState}
            materiaType={materiaType}
            />
          &nbsp;&nbsp;
            <Button onClick={() => changePk(materia.pk)}>
                See Detail
            </Button>
          &nbsp;&nbsp;
              <ConfirmRemovalModal
            pk={materia.pk}
            resetState={resetState}
            materiaType={materiaType}
            name={materia.name}
            />
        </ButtonGroup>
    </CardFooter>
</Card>
);}