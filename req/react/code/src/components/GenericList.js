import React from "react";
import { Col, Row} from "reactstrap";
import { CONF } from "../constants";


export default function GenericList ({data, resetState, materiaType, changePk}) {
	var MateriaCard = CONF[materiaType].card;
	const deck = [];
	const row = {};
	const NCOLS = 4;

	var materia;
	let i;
	row[0] = [];
	for (i in data) {
		materia = data[i];
		row[Math.floor(i / NCOLS)].push(<Col key={materia.pk}><MateriaCard 
			key={materia.pk} 
			materia={materia} 
			materiaType={materiaType} 
			resetState={resetState}
			changePk={changePk} /></Col>)
		if ((Number.parseInt(i) + 1) % NCOLS === 0) {
			console.log("yeah")
			deck.push(<Row key={Math.floor(i / NCOLS)}>{row[Math.floor(i / NCOLS)]}</Row>)
			row[Math.floor(i / NCOLS) + 1] = [];
		}
	}
	if ((Number.parseInt(i) + 1) % NCOLS !== 0) {
		deck.push(<Row key={Math.floor(i / NCOLS)}>{row[Math.floor(i / NCOLS)]}</Row>);
	}

	return (
		deck
	);
}
