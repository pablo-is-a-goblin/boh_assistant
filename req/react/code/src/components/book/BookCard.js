import React from "react";
import { CardTitle, CardText} from "reactstrap";

export default function BookCard({materia}) {

return (
    <>
      <CardTitle tag="h2">{materia.abv}</CardTitle>
      <CardText tag="h4">{materia.name}</CardText>
      <CardText tag="i">{materia.description}</CardText>
      <CardText className="text-center"><img className="materia-label" src={materia.mistery.image} alt={materia.mistery.name} />{materia.dificulty}</CardText>
    </>

);}