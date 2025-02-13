import React from "react";
import { ButtonGroup, CardFooter, CardGroup, Card, CardBody, CardText, CardTitle, Col } from "reactstrap";
import NewPrincipleModal from "./NewPrincipleModal";
import ConfirmRemovalModal from "./ConfirmRemovalModal";

export default function PrincipleList ({principles, resetState}) {
	return (
		<CardGroup>
		{principles.map(principle => (
      <Col l="2">
        <Card>
				<img src={principle.image} alt={principle.name}></img>
				<CardBody>
					<CardTitle tag="h2">{principle.name}</CardTitle>
					<CardText tag="i">{principle.description}</CardText>
				</CardBody>
				<CardFooter>
					<ButtonGroup>
	               		<NewPrincipleModal
                    	create={false}
                    	principle={principle}
                    	resetState={resetState}
						/>
                  	&nbsp;&nbsp;
                  		<ConfirmRemovalModal
                    	pk={principle.pk}
                    	resetState={resetState}
						/>
					</ButtonGroup>
				</CardFooter>
			</Card>
    </Col>
		))}
		</CardGroup>
	);
}
