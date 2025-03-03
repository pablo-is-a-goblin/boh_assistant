import React from "react";
import { CardTitle, CardText } from "reactstrap";

export default function MemoryCard({materia}) {
return (
    <>
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
    </>

);}