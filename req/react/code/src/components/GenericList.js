import React from "react";
import { Col, Row} from "reactstrap";
import MateriaCard from "./MateriaCard";

export default function GenericList ({data, resetState, materiaType, changePk, changeType}) {
	const deck = [];
	const row = {};
	const NCOLS = 4;

	var materia;
	let i;
	row[0] = [];
	for (i in data) {
		materia = data[i];
		row[Math.floor(i / NCOLS)].push(<Col xs="3" style={{ marginBottom: "20px" }} key={materia.pk}><MateriaCard 
			key={materia.pk} 
			materia={materia} 
			materiaType={materiaType} 
			resetState={resetState}
			changePk={changePk}
			changeType={changeType} /></Col>)
		if ((Number.parseInt(i) + 1) % NCOLS === 0) {
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
