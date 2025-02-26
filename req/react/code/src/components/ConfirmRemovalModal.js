import React, { Fragment, useState } from "react";
import { Modal, ModalHeader, Button, ModalFooter } from "reactstrap";

import axios from "axios";

import { API_URL, CONF } from "../constants";

export default function ConfirmRemovalModal ({pk, resetState, materiaType, name}) {
  const [modal, setModal] = useState(false);

  function toggle() {
    setModal(!modal);
  }

  function deleteMateria(pk) {
    axios.delete(API_URL + materiaType + "/" + pk + "/").then(() => {
      resetState();
      toggle();
    });
  }

  return (
    <Fragment>
      <Button color="danger" onClick={() => toggle()}>
        Remove
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>
          Do you really wanna delete the {name} {CONF[materiaType].pretty}?
        </ModalHeader>
        <ModalFooter>
          <Button type="button" onClick={() => toggle()}>
            Cancel
          </Button>
          <Button
            type="button"
            color="primary"
            onClick={() => deleteMateria(pk)}
          >
            Yes
          </Button>
        </ModalFooter>
      </Modal>
    </Fragment>
  );
}
