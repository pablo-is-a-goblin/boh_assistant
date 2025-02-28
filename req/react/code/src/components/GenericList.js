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
	const deck = [];
	const row = {};
	var materia;
	let i;
	row[0] = []
	for (i in data) {
		materia = data[i];
		row[Math.floor(i / 3)].push(<Col><MateriaCard key={materia.pk} materia={materia} materiaType={materiaType} resetState={resetState} /></Col>)
		if ((i + 1) % 3 === 0) {
			deck.push(<Row>{row[Math.floor(i / 3)]}</Row>)
			row[Math.floor(i / 3) + 1] = [];
		}
	}
	if ((i + 1) % 3 !== 0) {
		deck.push(<Row>{row[Math.floor(i / 3)]}</Row>);
	}

	return (
		deck
		// data.map((materia) => (
		// <div>
		// 	<MateriaCard key={materia.pk} materia={materia} materiaType={materiaType} resetState={resetState} />
		// </div>
		// ))
	);
}
