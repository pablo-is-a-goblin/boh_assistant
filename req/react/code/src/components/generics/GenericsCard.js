import React from "react";
import { CardTitle, CardText } from "reactstrap";

export default function GenericsCard ({materia}) {
    return (
        <>
            <CardTitle tag="h2">{materia.name}</CardTitle>
            <CardText tag="i">{materia.description}</CardText>
        </>
);}