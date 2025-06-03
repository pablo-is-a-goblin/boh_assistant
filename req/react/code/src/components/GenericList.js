import React from "react";
import { Col, Row} from "reactstrap";
import MateriaCard from "./MateriaCard";

export default function GenericList ({data, resetState, materiaType, changePk, changeType, sort}) {
	const deck = [];
	const row = {};
	const NCOLS = 6;

	data.sort(function sorting(a,b) {
		if (a[sort] === b[sort])
			return 0;
		if (a[sort] === undefined || a[sort] === "" || !a[sort])
			return 1;
		if (b[sort] === undefined || b[sort] === "" || !b[sort])
			return -1;
		if (a[sort].name !== undefined || b[sort].name !== undefined) {
			var a_crit = a[sort].name;
			var b_crit = b[sort].name;
		} else {
			a_crit = a[sort];
			b_crit = b[sort];
		}

		if (a_crit < b_crit)
			return -1;
		else
			return 1;
	})

	var materia;
	let i;
	row[0] = [];
	for (i in data) {
		materia = data[i];
		row[Math.floor(i / NCOLS)].push(<Col xs="2" style={{ marginBottom: "20px" }} key={materia.pk}><MateriaCard 
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
