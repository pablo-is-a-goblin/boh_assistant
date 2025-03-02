import React from "react";
import { Card, CardBody, CardFooter, CardTitle, CardText, ButtonGroup, Button } from "reactstrap";
import NewBookModal from "./NewBookModal";
import ConfirmRemovalModal from "../ConfirmRemovalModal";

export default function BookCard({materia, materiaType, resetState, changePk}) {
    var mat_img;
    if (materia.image) {
        mat_img = <img src={materia.image} alt={materia.name}></img>;
    }
return (
    <Card className="materia-card-img">
        {mat_img}
        <CardBody>
            <CardTitle tag="h2">{materia.abv}</CardTitle>
            <CardText tag="h4">{materia.name}</CardText>
            <CardText tag="i">{materia.description}</CardText>
            <CardText className="text-center"><img className="materia-label" src={materia.mistery.image} alt={materia.mistery.name} />{materia.dificulty}</CardText>
        </CardBody>
        <CardFooter>
            <ButtonGroup>
                <NewBookModal
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
                materiaType={materiaType}
                name={materia.name}
                />
            </ButtonGroup>
        </CardFooter>
    </Card>
);}