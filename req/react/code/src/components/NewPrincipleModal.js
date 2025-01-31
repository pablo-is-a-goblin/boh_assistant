import React, { Component, Fragment } from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import NewPrincipleForm from "./NewPrincipleForm";

class NewPrincipleModal extends Component {
	state = {
	  modal: false
	};
  
	toggle = () => {
	  this.setState(previous => ({
		modal: !previous.modal
	  }));
	};
  
	render() {
	  const create = this.props.create;
  
	  var title = "Editing Principle";
	  var button = <Button onClick={this.toggle}>Edit</Button>;
	  if (create) {
		title = "Creating New Principle";
  
		button = (
		  <Button
			color="primary"
			className="float-right"
			onClick={this.toggle}
			style={{ minWidth: "200px" }}
		  >
			Create New
		  </Button>
		);
	  }
  
	  return (
		<Fragment>
		  {button}
		  <Modal isOpen={this.state.modal} toggle={this.toggle}>
			<ModalHeader toggle={this.toggle}>{title}</ModalHeader>
  
			<ModalBody>
			  <NewPrincipleForm
				resetState={this.props.resetState}
				toggle={this.toggle}
				principle={this.props.principle}
			  />
			</ModalBody>
		  </Modal>
		</Fragment>
	  );
	}
  }
  
  export default NewPrincipleModal;