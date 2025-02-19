import React from "react";
import { ButtonGroup, CardFooter, CardGroup, Card, CardBody, CardText, CardTitle, Col } from "reactstrap";
import NewSkillModal from "./NewSkillModal";
import ConfirmRemovalModal from "../ConfirmRemovalModal";

export default function SkillList ({data, resetState}) {

	return (
		<CardGroup>
		{data.map(materia => (
        <Card>
				<img src={materia.image} alt={materia.name}></img>
				<CardBody>
					<CardTitle tag="h2">{materia.name}</CardTitle>
					<CardText tag="i">{materia.description}</CardText>
					<CardText><img src={materia.principle1.image} alt={materia.principle1.name}></img>
					<img src={materia.principle2.image} alt={materia.principle2.name}></img></CardText>
				</CardBody>
				<CardFooter>
					<ButtonGroup>
	               		<NewSkillModal
                    	create={false}
                    	materia={materia}
                    	resetState={resetState}
						/>
                  	&nbsp;&nbsp;
                  		<ConfirmRemovalModal
                    	pk={materia.pk}
                    	resetState={resetState}
						materiaType="skill"
						/>
					</ButtonGroup>
				</CardFooter>
			</Card>
		))}
		</CardGroup>
	);
}
