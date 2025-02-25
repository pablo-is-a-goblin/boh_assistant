import React from "react";
import { Col, CardGroup } from "reactstrap";
import GenericsCard from "./generics/GenericsCard";
import SkillsCard from "./skill/SkillsCard";
import MemoryCard from "./memory/MemoryCard";

export default function GenericList ({data, resetState, materiaType}) {
	var MateriaCard;
	if (materiaType.valueOf() === "principle" || materiaType.valueOf() === "skill_label" ||
		materiaType.valueOf() === "object_label" || materiaType.valueOf() === "tongue") {
		MateriaCard = GenericsCard;
	} else if (materiaType.valueOf() === "skill") {
		MateriaCard = SkillsCard;
	} else if (materiaType.valueOf() === "memory") {
		MateriaCard = MemoryCard;
	}

	return (
		data.map(materia => (
			<MateriaCard key={materia.pk} materia={materia} materiaType={materiaType} resetState={resetState} />
		))
	);
}
