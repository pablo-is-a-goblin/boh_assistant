import React, {useState, useEffect} from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import axios from "axios";
import { API_URL } from "../../constants";

export default function NewMemoryForm ({materia, toggle, resetState, type}) {
	const pk = initPk();
	const [name, setName] = useState(initName);
	const [description, setDescription] = useState(initDescription);
	const [image, setImage] = useState(initImage);
	const [principleQty, setPrincipleQty] = useState(initPrincipleQty)
	const [aspects, setAspects] = useState(initAspects);
	const [principleData, setPrincipleData] = useState([]);
	const [aspectData, setAspectData] = useState([]);

	async function getInitData() {
		let response = await axios.get(API_URL + "principle");
		setPrincipleData(response.data);	
		response = await axios.get(API_URL + "object_label");
		setAspectData(response.data);	
	}

	useEffect(() => {getInitData();}, []);

	function initPk() { return (materia ? materia.pk : 0) }
	function initName() { return (materia ? materia.name : "") }
	function initDescription() { return (materia ? materia.description : "") }
	function initImage() { return ("") }
	function initPrincipleQty() { return (materia ? materia.principles.reduce((res, val, i) => ({...res, [val.principle.name]: val.qty}), {}) : {}) }
	function initAspects() {return (materia ? materia.aspects.flatMap(x => x.name) : [])}

	function getPrinciplePk(name) {
		for (let i in principleData) {
			if (name.valueOf() === principleData[i].name.valueOf() )
				return (principleData[i].pk);
		}
		return (principleData[0].pk);
	}
	function getAspectPk(name) {
		for (let i in aspectData) {
			if (name.valueOf() === aspectData[i].name.valueOf() )
				return (aspectData[i].pk);
		}
		return (aspectData[0].pk);
	}
	function getFormData() {
		let data = new FormData();
		data.append("pk", pk);
		data.append("name", name);
		data.append("description", description);
		data.append("object_type", "MEMORY")
		for (let i in aspects) {
			data.append("aspects", getAspectPk(aspects[i]));
		}
		for (let i in principleQty) {
			data.append("principles", getPrinciplePk(i) + ":" + principleQty[i])
		}
		if (image) {data.append("image", image);};
		return (data);
	}

	function createMateria(e) {
		e.preventDefault();
		let data = getFormData();
		axios.post(API_URL + "memory/", data).then(() => {
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
		axios.put(API_URL + "memory/" + pk + "/", data).then(() => {
		  resetState();
		  toggle();
		});
	};
	
	function defaultIfEmpty (value) {
		return value === "" ? "" : value;
	};

	function updateAspects (value) {
		console.log(value);
		if (aspects.indexOf(value) === -1) {
			setAspects([...aspects, value])
		} else {
			console.log("HERE")
			setAspects(
				aspects.filter(a => a !== value)
			)
		}
	}

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
		Principle:
		{principleData.map(principle => (
		<FormGroup row>
			<Label for={principle.name}>{principle.name}: </Label>
			<Input
				type="number"
				name={principle.name}
				onChange={e => setPrincipleQty({...principleQty, [principle.name]: e.target.value})}
				value={principleQty[principle.name]}
			/>
		</FormGroup>
		))}
		Aspects:
		{aspectData.map(aspect => (
		<FormGroup check>
			<Input
			  id={aspect.name}
			  type="checkbox"
			  onChange={() => updateAspects(aspect.name)}
			  checked={aspects.includes(aspect.name)}
			/>
			<Label check>
			  {aspect.name}
			</Label>
		</FormGroup>
		))}
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
