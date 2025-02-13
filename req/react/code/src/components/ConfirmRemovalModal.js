import React, { Fragment, useState } from "react";
import { Modal, ModalHeader, Button, ModalFooter } from "reactstrap";

import axios from "axios";

import { API_URL } from "../constants";

export default function ConfirmRemovalModal ({pk, resetState}) {
  const [modal, setModal] = useState(false);

  function toggle() {
    setModal(!modal);
  }

  function deletePrinciple(pk) {
    axios.delete(API_URL + pk + "/").then(() => {
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
          Do you really wanna delete the Principle?
        </ModalHeader>
        <ModalFooter>
          <Button type="button" onClick={() => toggle()}>
            Cancel
          </Button>
          <Button
            type="button"
            color="primary"
            onClick={() => deletePrinciple(pk)}
          >
            Yes
          </Button>
        </ModalFooter>
      </Modal>
    </Fragment>
  );
}
