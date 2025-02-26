import React from "react";
import { Col, CardGroup } from "reactstrap";
import { CONF } from "../constants";

export default function GenericList ({data, resetState, materiaType}) {
	var MateriaCard = CONF[materiaType].card;

	return (
		data.map(materia => (
			<MateriaCard key={materia.pk} materia={materia} materiaType={materiaType} resetState={resetState} />
		))
	);
}
