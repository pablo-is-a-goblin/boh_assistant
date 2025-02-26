import React, { useState, Fragment } from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import NewMateriaForm from "./NewMateriaForm";
import { CONF } from "../../constants";

export default function NewMateriaModal ({create, resetState, materia, materiaType}) {
	const [modal, setModal] = useState(false);
  
	function toggle () {
		setModal(!modal);
	}

	var title = "Editing " + CONF[materiaType].pretty;
	var button = <Button onClick={toggle}>Edit</Button>;
	if (create) {
		title = "Creating New " + CONF[materiaType].pretty;
  
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
		  <NewMateriaForm
			resetState={resetState}
			toggle={toggle}
			materia={materia}
			type={materiaType}
		  />
		</ModalBody>
	  </Modal>
	</Fragment>
	);
  }
  