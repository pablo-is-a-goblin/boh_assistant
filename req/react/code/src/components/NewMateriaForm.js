import React, {useState} from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import axios from "axios";
import { API_URL } from "../constants";

export default function NewMateriaForm ({materia, toggle, resetState, type}) {
	const pk = initPk();
	const [name, setName] = useState(initName);
	const [description, setDescription] = useState(initDescription);
	const [image, setImage] = useState(initImage);

	function initPk() { return (materia ? materia.pk : 0) }
	function initName() { return (materia ? materia.name : "") }
	function initDescription() { return (materia ? materia.description : "") }
	function initImage() { return ("") }

	function createMateria(e) {
		e.preventDefault();
		let data = new FormData();
		data.append("pk", pk);
		data.append("name", name);
		data.append("description", description);
		if (image) {data.append("image", image);};
		axios.post(API_URL + type + "/", data).then(() => {
		  resetState();
		  toggle();
		}).catch((error) => {
			console.log(error);
		}
		);
	};

	function editMateria (e) {
		e.preventDefault();
		let data = new FormData();
		data.append("pk", pk);
		data.append("name", name);
		data.append("description", description);
		if (image) {data.append("image", image);};
		axios.put(API_URL + type + "/" + pk + "/", data).then(() => {
		  resetState();
		  toggle();
		});
	};
	
	function defaultIfEmpty (value) {
		return value === "" ? "" : value;
	};

	return (
	  <Form onSubmit={materia ? editMateria : createMateria}>
		<FormGroup>
		  <Label for="name">Name:</Label>
		  <Input
			type="text"
			name="name"
			onChange={e => setName(e.target.value)}
			value={defaultIfEmpty(name)}
		  />
		</FormGroup>
		<FormGroup>
		  <Label for="description">Description:</Label>
		  <Input
			type="textarea"
			name="description"
			onChange={e => setDescription(e.target.value)}
			value={defaultIfEmpty(description)}
		  />
		</FormGroup>
		<FormGroup>
		  <Label for="image">Image:</Label>
		  <Input
			type="file"
			name="image"
			onChange={e => setImage(e.target.files[0])}
		  />
		</FormGroup>
		<Button>Send</Button>
	  </Form>
	);
}
