import React from "react";
import { Col, CardGroup, Row} from "reactstrap";
import { CONF } from "../constants";

export default function GenericList ({data, resetState, materiaType}) {
	var MateriaCard = CONF[materiaType].card;

	// var MateriaList = "<Row>";
	// for (let i in data) {
	// 	materia = data[i];
	// 	MateriaList += "<MateriaCard key=" + materia.pk + " materia={materia} materiaType={materiaType} resetState={resetState}"
	// 	if ((i+1) % 3) {
	// 		MateriaList += "</Row><Row>";
	// 	}
	// }

	return (
		data.map((materia) => (
		<div>
			<MateriaCard key={materia.pk} materia={materia} materiaType={materiaType} resetState={resetState} />
		</div>
		))
	);
}
