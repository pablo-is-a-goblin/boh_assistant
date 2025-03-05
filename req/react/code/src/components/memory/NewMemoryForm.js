import React, {useState, useEffect} from "react";
import { Button, Form, FormGroup, Input, Label, InputGroup, InputGroupText } from "reactstrap";
import axios from "axios";
import { API_URL } from "../../constants";

export default function NewMemoryForm ({materia, toggle, resetState, type}) {
	const pk = initPk();
	const [name, setName] = useState(initName);
	const [description, setDescription] = useState(initDescription);
	const [image, setImage] = useState(initImage);
	const [principleQty, setPrincipleQty] = useState(initPrincipleQty)
	const [aspects, setAspects] = useState(initAspects);
	const [talking, setTalking] = useState(initTalking);
	const [considering, setConsidering] = useState(initConsidering);
	const [principleData, setPrincipleData] = useState([]);
	const [aspectData, setAspectData] = useState([]);
	const [memoryData, setMemoryData] = useState([])

	async function getInitData() {
		let response = await axios.get(API_URL + "principle");
		setPrincipleData(response.data);	
		response = await axios.get(API_URL + "object_label");
		setAspectData(response.data);	
		response = await axios.get(API_URL + "memory");
		setMemoryData(response.data);
	}

	useEffect(() => {getInitData();}, []);

	function initPk() { return (materia ? materia.pk : 0) }
	function initName() { return (materia ? materia.name : "") }
	function initDescription() { return (materia ? materia.description : "") }
	function initImage() { return ("") }
	function initPrincipleQty() { return (materia ? materia.principles.reduce((res, val, i) => ({...res, [val.principle.name]: val.qty}), {}) : {}) }
	function initAspects() {return (materia ? materia.aspects.flatMap(x => x.name) : [])}
	function initConsidering() { return (materia && materia.considering ? materia.considering.name : "" ) }
	function initTalking() { return (materia && materia.talking ? materia.talking.name : "" ) }

	function getPrinciplePk(name) {
		for (let i in principleData) {
			if (name.valueOf() === principleData[i].name.valueOf() )
				return (principleData[i].pk);
		}
		return ("");
	}
	function getAspectPk(name) {
		for (let i in aspectData) {
			if (name.valueOf() === aspectData[i].name.valueOf() )
				return (aspectData[i].pk);
		}
		return ("");
	}
	function getMemoryPk(name) {
		for (let i in memoryData) {
			if (name.valueOf() === memoryData[i].name.valueOf() )
				return (memoryData[i].pk);
		}
		return ("");
	}
	function getFormData() {
		let data = new FormData();
		data.append("pk", pk);
		data.append("name", name);
		data.append("description", description);
		if (type === "memory") {
			data.append("object_type", "MEMORY");
		} else {
			data.append("considering", getMemoryPk(considering));
			if (type === "beast") {
				data.append("object_type", "BEAST");
				data.append("talking", getMemoryPk(talking));
			} else {
				data.append("object_type", "THING");
			}
		}
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
		let data = getFormData();
		axios.put(API_URL + type + "/" + pk + "/", data).then(() => {
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
			setAspects(
				aspects.filter(a => a !== value)
			)
		}
	}

	var considerInput;
	if (type !== "memory") {
		considerInput = (<FormGroup>
		<Label for="considering">Considering...</Label>
		<Input
			type="select"
			name="considering"
			onChange={e => setConsidering(e.target.value)}
			value={defaultIfEmpty(considering)}>
			<option></option>
			{memoryData.map( memory => (
				<option>
					{memory.name}
				</option>
			))}
		</Input>
		</FormGroup>);
	}
	var talkInput;
	if (type !== "memory") {
		talkInput = (<FormGroup>
		<Label for="talking">Talking...</Label>
		<Input
			type="select"
			name="talking"
			onChange={e => setTalking(e.target.value)}
			value={defaultIfEmpty(talking)}>
			<option></option>
			{memoryData.map( memory => (
				<option>
					{memory.name}
				</option>
			))}
		</Input>
		</FormGroup>);
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
		<h5>Principles: </h5>
		<FormGroup row>
		{principleData.map(principle => (
			<InputGroup>
			<InputGroupText>
				<img className="materia-label" src={principle.image} alt={principle.name}></img>
			</InputGroupText>
			<Input
				type="number"
				name={principle.name}
				onChange={e => setPrincipleQty({...principleQty, [principle.name]: e.target.value})}
				value={principleQty[principle.name]}
				/>
			</InputGroup>
		))}
		</FormGroup>
		<h5>Aspects: </h5>
		{aspectData.map(aspect => (
		<FormGroup check>
			<Input
			  id={aspect.name}
			  type="checkbox"
			  onChange={() => updateAspects(aspect.name)}
			  checked={aspects.includes(aspect.name)}
			/>
			<Label check>
			  {aspect.name}    <img src={aspect.image} alt={aspect.name} className="materia-label" />
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
		{talkInput}
		{considerInput}
		<Button>Send</Button>
	  </Form>
	);
}
