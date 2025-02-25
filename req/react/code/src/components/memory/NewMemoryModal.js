import React, { useState, Fragment } from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import NewMemoryForm from "./NewMemoryForm";

export default function NewMemoryModal ({create, resetState, materia}) {
	const [modal, setModal] = useState(false);
  
	function toggle () {
		setModal(!modal);
	}

	var title = "Editing Memory";
	var button = <Button onClick={toggle}>Edit</Button>;
	if (create) {
		title = "Creating New Memory";
  
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
		  <NewMemoryForm
			resetState={resetState}
			toggle={toggle}
			materia={materia}
		  />
		</ModalBody>
	  </Modal>
	</Fragment>
	);
  }
  