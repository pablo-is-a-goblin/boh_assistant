import React from "react";
import { Col, CardGroup } from "reactstrap";
import GenericsCard from "./generics/GenericsCard";
import SkillsCard from "./skill/SkillsCard";

export default function GenericList ({data, resetState, materiaType}) {
	var MateriaCard;
	if (materiaType.valueOf() === "principle" || materiaType.valueOf() === "skill_label") {
		MateriaCard = GenericsCard;
	} else if (materiaType.valueOf() === "skill") {
		MateriaCard = SkillsCard;
	}

	return (
		data.map(materia => (
			<MateriaCard key={materia.pk} materia={materia} materiaType={materiaType} resetState={resetState} />
		))
	);
}
