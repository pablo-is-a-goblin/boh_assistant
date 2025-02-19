import React, {useState, useEffect} from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import axios from "axios";
import { API_URL } from "../../constants";

export default function NewSkillForm ({materia, toggle, resetState, type}) {
	const pk = initPk();
	const [name, setName] = useState(initName);
	const [description, setDescription] = useState(initDescription);
	const [image, setImage] = useState(initImage);
	const [principle1, setPrinciple1] = useState(initPrinciple1);
	const [principle2, setPrinciple2] = useState(initPrinciple2);
	const [aspects, setAspects] = useState(initAspects);
	const [principleData, setPrincipleData] = useState([]);

	async function getPrincipleData() {
		let response = await axios.get(API_URL + "principle");
		setPrincipleData(response.data);		
		console.log("YATA");
	}

	useEffect(() => {getPrincipleData();}, []);

	function initPk() { return (materia ? materia.pk : 0) }
	function initName() { return (materia ? materia.name : "") }
	function initDescription() { return (materia ? materia.description : "") }
	function initImage() { return ("") }
	function initPrinciple1() { return (materia ? materia.principle1.name : "") }
	function initPrinciple2() { return (materia ? materia.principle2.name : "") }
	function initAspects() {return (materia ? materia.aspects : [])}

	function getPrinciplePk(name) {
		for (let i in principleData) {
			if (name.valueOf() === principleData[i].name.valueOf() )
				return (principleData[i].pk);
		}
	}
	function getFormData() {
		let data = new FormData();
		data.append("pk", pk);
		data.append("name", name);
		data.append("description", description);
		data.append("principle1", getPrinciplePk(principle1));
		data.append("principle2", getPrinciplePk(principle2));
		if (aspects.length) {data.append("aspects", aspects);};
		if (image) {data.append("image", image);};
		return (data);
	}

	function createMateria(e) {
		e.preventDefault();
		let data = getFormData();
		axios.post(API_URL + "skill/", data).then(() => {
		  resetState();
		  toggle();
		}).catch((error) => {
			console.log(error);
		}
		);
	};

	function editMateria (e) {
		e.preventDefault();
		let data = getFormData();
		axios.put(API_URL + "skill/" + pk + "/", data).then(() => {
		  resetState();
		  toggle();
		});
	};
	
	function defaultIfEmpty (value) {
		return value === "" ? "" : value;
	};

	return (
		principleData.length &&
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
		  <Label for="principle1">Primary Principle:</Label>
		  <Input
			type="select"
			name="principle1"
			onChange={e => setPrinciple1(e.target.value)}
			value={defaultIfEmpty(principle1)}
		  >
			{principleData.map( principle => (
				<option>
					{principle.name}
				</option>
			))}
		  </Input>
		</FormGroup>
		<FormGroup>
		  <Label for="principle2">Secondary Principle:</Label>
		  <Input
			type="select"
			name="principle2"
			onChange={e => setPrinciple2(e.target.value)}
			value={defaultIfEmpty(principle2)}
		  >
			{principleData.map( principle => (
				<option>
					{principle.name}
				</option>
			))}
		  </Input>
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
