import React from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import axios from "axios";
import { API_URL } from "../constants";

class NewPrincipleForm extends React.Component {
	state = {
	  pk: 0,
	  name: "",
	  description: "",
	  image: "",
	};

	componentDidMount() {
		if (this.props.principle) {
		  const { pk, name, description, image } = this.props.principle;
		  this.setState({ pk, name, description, image });
		}
	}

	onChange = e => {
		this.setState({ [e.target.name]: e.target.value });
	};

	onChangeFile = e => {
		this.setState({image: e.target.files[0]})
	};

	createPrinciple = e => {
		e.preventDefault();
		let data = new FormData();
		data.append("pk", this.state.pk);
		data.append("name", this.state.name);
		data.append("description", this.state.description);
		data.append("image", this.state.image);
		axios.post(API_URL, data).then(() => {
		  this.props.resetState();
		  this.props.toggle();
		});
	};

	editPrinciple = e => {
		e.preventDefault();
		let data = new FormData();
		data.append("pk", this.state.pk);
		data.append("name", this.state.name);
		data.append("description", this.state.description);
		data.append("image", this.state.image);
		axios.put(API_URL + this.state.pk, data).then(() => {
		  this.props.resetState();
		  this.props.toggle();
		});
	};
	
	defaultIfEmpty = value => {
		return value === "" ? "" : value;
	};

	render() {
		return (
		  <Form onSubmit={this.props.principle ? this.editPrinciple : this.createPrinciple}>
			<FormGroup>
			  <Label for="name">Name:</Label>
			  <Input
				type="text"
				name="name"
				onChange={this.onChange}
				value={this.defaultIfEmpty(this.state.name)}
			  />
			</FormGroup>
			<FormGroup>
			  <Label for="description">Description:</Label>
			  <Input
				type="textarea"
				name="description"
				onChange={this.onChange}
				value={this.defaultIfEmpty(this.state.description)}
			  />
			</FormGroup>
			<FormGroup>
			  <Label for="image">Image:</Label>
			  <Input
				type="file"
				name="image"
				onChange={this.onChangeFile}
			  />
			</FormGroup>
			<Button>Send</Button>
		  </Form>
		);
	}
}

export default NewPrincipleForm;