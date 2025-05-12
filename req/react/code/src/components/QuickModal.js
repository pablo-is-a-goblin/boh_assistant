import React, { useState, Fragment } from "react";
import { Button, Modal, ModalHeader, ModalBody, Label, Input } from "reactstrap";
import { API_URL } from "../constants";
import axios from "axios"

export default function QuickModal ({resetState, materiaType, setParentState}) {
    const [modal, setModal] = useState(false);
    const [name, setName] = useState();
    const [description, setDescription] = useState();
  
    function toggle () {
        setModal(!modal);
    }
  
    function createQuickMateria(e) {
        e.preventDefault();
        let data = new FormData();
        data.append("name", name);
        data.append("description", description);
        axios.post(API_URL + materiaType + "/", data).then(() => {
          resetState();
          toggle();
          setParentState(name);
        }).catch((error) => {
            console.log(error);
        }
        );
    }

    return (
    <Fragment>
      <Button onClick={toggle}>Add new {materiaType}</Button>
      <Modal size="lg" isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Quick new {materiaType}</ModalHeader>
        <ModalBody>
            <Label for="name">Name:</Label>
            <Input
                type="text"
                name="name"
                onChange={e => setName(e.target.value)}
                value={name}
            />
            <Label for="description">Description:</Label>
            <Input
                type="textarea"
                name="description"
                onChange={e => setDescription(e.target.value)}
                value={description}
            />
            <Button onClick={createQuickMateria}>Create</Button>
        </ModalBody>
      </Modal>
    </Fragment>
    );
  }