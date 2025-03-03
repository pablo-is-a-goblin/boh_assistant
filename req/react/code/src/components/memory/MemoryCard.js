import React from "react";
import { CardTitle, CardText } from "reactstrap";

export default function MemoryCard({materia}) {
  var principles = [];

  for (let i in materia.principles) {
    var principle = materia.principles[i];
    if (Number.parseInt(i) !== 0)
      principles.push(<i className="bi bi-suit-diamond-fill"/>);
    if (Number.parseInt(principle.qty) !== 1)
      principles.push(principle.qty);
    principles.push(<img className="materia-label" src={principle.principle.image} alt={principle.principle.name} />);

  }
return (
    <>
      <CardTitle tag="h2">{materia.name}</CardTitle>
      <CardText tag="i">{materia.description}</CardText>
      <CardText className="text-center">
      {principles}
      </CardText>
      <CardText className="text-center">
       {materia.aspects.map(aspect => <img className="materia-label" src={aspect.image} alt={aspect.name} />)}
      </CardText>
    </>

);}