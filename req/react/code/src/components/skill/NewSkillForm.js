import React, {useState, useEffect} from "react";
import { Button, Form, FormGroup, Input, Label, Collapse } from "reactstrap";
import axios from "axios";
import { API_URL } from "../../constants";

export default function NewSkillForm ({materia, toggle, resetState, type}) {
	const pk = initValue("pk");
	const [isOpen, setOpen] = useState(false)
	const [name, setName] = useState(initValue("name"));
	const [description, setDescription] = useState(initValue("description"));
	const [image, setImage] = useState(initImage);
	const [principle1, setPrinciple1] = useState(initComposedValue("principle1"));
	const [principle2, setPrinciple2] = useState(initComposedValue("principle2"));
	const [aspects, setAspects] = useState(initAspects);
	const [wisdom1, setWisdom1] = useState(initValue("wisdom1"));
	const [wisdom2, setWisdom2] = useState(initValue("wisdom2"));
	const [principleData, setPrincipleData] = useState([]);
	const [aspectData, setAspectData] = useState([]);

	async function getInitData() {
		let response = await axios.get(API_URL + "principle");
		setPrincipleData(response.data);	
		response = await axios.get(API_URL + "skill_label");
		setAspectData(response.data);	
	}
	
	const toggleAdvanced = () => setOpen(!isOpen);

	useEffect(() => {getInitData();}, []);

	function initValue(value) { return (materia ? materia[value] : "") };
	function initComposedValue(value) { return ((materia && materia[value])? materia[value].name : "") }
	function initImage() { return ("") };
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
		data.append("principle1", getPrinciplePk(principle1));
		data.append("principle2", getPrinciplePk(principle2));
		data.append("wisdom1", wisdom1);
		data.append("wisdom2", wisdom2);
		for (let i in aspects) {
			data.append("aspects", getAspectPk(aspects[i]));
		}
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
		<Button onClick={toggleAdvanced}>Advanced Options</Button>
		<Collapse isOpen={isOpen}>
		<h5>Aspects:</h5>
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
		  <Label for="wisdom1">Wisdom 1 text:</Label>
		  <Input
			type="textarea"
			name="wisdom1"
			onChange={e => setWisdom1(e.target.value)}
			value={defaultIfEmpty(wisdom1)}
		  />
		</FormGroup>
		<FormGroup>
		  <Label for="wisdom2">Wisdom 2 text:</Label>
		  <Input
			type="textarea"
			name="wisdom2"
			onChange={e => setWisdom2(e.target.value)}
			value={defaultIfEmpty(wisdom2)}
			/>
		</FormGroup>
		</Collapse>
		<Button>Send</Button>
	  </Form>
	);
}
