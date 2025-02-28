import React, {useState, useEffect} from "react";
import { Button, Form, FormGroup, Input, Label, Collapse } from "reactstrap";
import axios from "axios";
import { API_URL } from "../../constants";

export default function NewBookForm ({materia, toggle, resetState, type}) {
	const pk = initValue("pk");
	const [isOpen, setOpen] = useState(false);
	const [name, setName] = useState(initValue("name"));
	const [description, setDescription] = useState(initValue("description"));
	const [image, setImage] = useState(initImage);
	const [abv, setAbv] = useState(initValue("abv"));
	const [tally, setTally] = useState(initValue("tally"));
	const [dificulty, setDificulty] = useState(initValue("dificulty"));
	const [reading, setReading] = useState(initValue("reading"));
	const [read, setRead] = useState(initValue("read"));
	const [tongue, setTongue] = useState(initComposedValue("tongue"));
	const [memory, setMemory] = useState(initComposedValue("memory"));
	const [mistery, setMistery] = useState(initComposedValue("mistery"));
	const [principleData, setPrincipleData] = useState([]);
	const [memoryData, setMemoryData] = useState([]);
	const [tongueData, setTongueData] = useState([]);

	const toggleAdvanced = () => setOpen(!isOpen);

	async function getInitData() {
		let response = await axios.get(API_URL + "principle");
		setPrincipleData(response.data);	
		response = await axios.get(API_URL + "memory");
		setMemoryData(response.data);	
		response = await axios.get(API_URL + "tongue");
		setTongueData(response.data);	
	}
	useEffect(() => {getInitData();}, []);

	function initValue(value) { return (materia ? materia[value] : "") };
	function initComposedValue(value) { return ((materia && materia[value])? materia[value].name : "") }
	function initImage() { return ("") };

	function getNamePk(name, where) {
		for (let i in where) {
			if (name.valueOf() === where[i].name.valueOf() )
				return (where[i].pk);
		}
		return ("");
	}

	function getFormData() {
		let data = new FormData();
		data.append("pk", pk);
		data.append("name", name);
		data.append("description", description);
		data.append("abv", abv);
		data.append("tally", tally);
		data.append("dificulty", dificulty);
		data.append("reading", reading);
		data.append("read", read);
		data.append("tongue", getNamePk(tongue, tongueData));
		data.append("mistery", getNamePk(mistery, principleData));
		data.append("memory", getNamePk(memory, memoryData));
		if (image) {data.append("image", image);};
		return (data);
	}

	function createMateria(e) {
		e.preventDefault();
		let data = getFormData();
		axios.post(API_URL + "book/", data).then(() => {
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
		axios.put(API_URL + "book/" + pk + "/", data).then(() => {
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
		  <Label for="abv">Abreviature:</Label>
		  <Input
			type="text"
			name="abv"
			onChange={e => setAbv(e.target.value)}
			value={defaultIfEmpty(abv)}
		  />
		</FormGroup>
		<FormGroup>
		  <Label for="dificulty">Difficulty:</Label>
		  <Input
			type="number"
			name="dificulty"
			onChange={e => setDificulty(e.target.value)}
			value={defaultIfEmpty(dificulty)}
		  />
		</FormGroup>
		<FormGroup>
		<Label for="mistery">Mistery:</Label>
		<Input
			type="select"
			name="mistery"
			onChange={e => setMistery(e.target.value)}
			value={defaultIfEmpty(mistery)}>
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
		<FormGroup>
		<Label for="memory">Memory produced:</Label>
		<Input
			type="select"
			name="memory"
			onChange={e => setMemory(e.target.value)}
			value={defaultIfEmpty(memory)}>
			<option></option>
			{memoryData.map( principle => (
				<option>
					{principle.name}
				</option>
			))}
		</Input>
		</FormGroup>
		<Button onClick={toggleAdvanced}>Advanced Options</Button>
		<Collapse isOpen={isOpen}>
		<FormGroup>
		  <Label for="tally">Tally:</Label>
		  <Input
			type="number"
			name="tally"
			onChange={e => setTally(e.target.value)}
			value={defaultIfEmpty(tally)}
		  />
		</FormGroup>
		<FormGroup>
		  <Label for="reading">Reading:</Label>
		  <Input
			type="textarea"
			name="reading"
			onChange={e => setReading(e.target.value)}
			value={defaultIfEmpty(reading)}
		  />
		</FormGroup>
		<FormGroup>
		  <Label for="read">Read:</Label>
		  <Input
			type="textarea"
			name="read"
			onChange={e => setRead(e.target.value)}
			value={defaultIfEmpty(read)}
		  />
		</FormGroup>
		<FormGroup>
		<Label for="tongue">Tongue:</Label>
		<Input
			type="select"
			name="tongue"
			onChange={e => setTongue(e.target.value)}
			value={defaultIfEmpty(tongue)}>
			<option></option>
			{tongueData.map( principle => (
				<option>
					{principle.name}
				</option>
			))}
		</Input>
		</FormGroup>
		</Collapse>
		<Button>Send</Button>
	  </Form>
	);
}
