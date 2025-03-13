import React from "react";
import { CardTitle, CardText} from "reactstrap";

export default function BookCard({materia, changeTo}) {
  var memory;
  if (materia.memory) {
    memory = (
      <CardText className="text-center">
      Read to produce <button 
      className="button-as-link" 
      onClick={() => changeTo("memory", materia.memory.pk)}>
      {materia.memory.name}
      </button>
      </CardText>
    );
  }

  var tongue;
  if (materia.tongue) {
    tongue = (
      <CardText className="text-center">
      Written in <button 
      className="button-as-link" 
      onClick={() => changeTo("tongue", materia.tongue.pk)}>
      {materia.tongue.name}
      </button>
      </CardText>
    );
  }
return (
    <>
      <CardTitle tag="h2">{materia.abv}</CardTitle>
      <CardText tag="h4">{materia.name}</CardText>
      <CardText tag="i">{materia.description}</CardText>
      <CardText className="text-center"><img className="materia-label" src={materia.mistery.image} alt={materia.mistery.name} />{materia.dificulty}</CardText>
      {memory}
      {tongue}
    </>

);}