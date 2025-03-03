import React from "react";
import { CardTitle, CardText } from "reactstrap";

export default function SkillsCard({materia}) {
return (
    <>
      <CardTitle tag="h2">{materia.name}</CardTitle>
      <CardText tag="i">{materia.description}</CardText>
      <CardText className="text-center"><img className="materia-label" src={materia.principle1.image} alt={materia.principle1.name}></img>
      <img className="materia-label" src={materia.principle2.image} alt={materia.principle2.name}></img>
      </CardText>
      <CardText className="text-center">
      {materia.aspects.map(aspect => <img className="materia-label" src={aspect.image} alt={aspect.name}></img>)}
      </CardText>
    </>

);}