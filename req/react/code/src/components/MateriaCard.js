import React from "react";
import { Card, CardBody, CardFooter, ButtonGroup, Button } from "reactstrap";
import ConfirmRemovalModal from "./ConfirmRemovalModal";
import { CONF } from "../constants";

export default function MateriaCard ({materia, materiaType, resetState, changeType, changePk}) {
    const NewModal = CONF[materiaType].modal;
    const CardContent = CONF[materiaType].card;

    var mat_img;
    if (materia.image) {
        mat_img = <img src={materia.image} alt={materia.name}></img>;
    }

    function changeTo(type, pk) {
        changePk(pk);
        changeType(type);
    }

    return (
<Card className="materia-card-img" style={{ height: "100%", }}>
    {mat_img}
    <CardBody>
        <CardContent materia={materia} changeTo={changeTo}/>
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
                See
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