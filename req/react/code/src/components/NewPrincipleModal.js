import React, { useState, Fragment } from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import NewPrincipleForm from "./NewPrincipleForm";

export default function NewPrincipleModal ({create, resetState, principle}) {
	const [modal, setModal] = useState(false);
  
	function toggle () {
		setModal(!modal);
	}

	var title = "Editing Principle";
	var button = <Button onClick={toggle}>Edit</Button>;
	if (create) {
		title = "Creating New Principle";
  
		button = (
		  <Button
			color="primary"
			className="float-right"
			onClick={toggle}
			style={{ minWidth: "200px" }}
		  >
			Create New
		  </Button>
		);
	}
  
	return (
	<Fragment>
	  {button}
	  <Modal isOpen={modal} toggle={toggle}>
		<ModalHeader toggle={toggle}>{title}</ModalHeader>
		<ModalBody>
		  <NewPrincipleForm
			resetState={resetState}
			toggle={toggle}
			principle={principle}
		  />
		</ModalBody>
	  </Modal>
	</Fragment>
	);
  }
  