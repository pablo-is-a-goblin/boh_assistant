import React, {useState} from "react";
import { Modal, ModalBody, ModalHeader, Button, Input, Form, FormGroup, Label } from "reactstrap";


export default function SortButton({setSort, materiaExample}) {
    const [modal, setModal] = useState(false);
    const [sortCrit, setSortCrit] = useState("");
    const toggle = () => setModal((prevState) => !prevState);

    function submit(e) {
      e.preventDefault();
      toggle();
      setSort(sortCrit);
    }

    return (
      materiaExample &&
      <>
          <Button
          color="secondary"
          className="float-right"
          onClick={toggle}
          >
          Filter and Sort
          </Button>
          <Modal isOpen={modal} toggle={toggle}>
              <ModalHeader toggle={toggle}>Filters and Sort</ModalHeader>
              <ModalBody>
                <Form onSubmit={submit}>
                  <FormGroup>
                  <Label for="sorting">Sort by:</Label>
                  <Input
                    type="select"
                    name="sorting"
                    onChange={e => setSortCrit(e.target.value)}
                    value={sortCrit ? sortCrit : ""}>
                    {Object.keys(materiaExample).filter(field => field !== "pk" && field !== "image").map(criteria =>
                      <option>
                        {criteria}
                      </option>
                    )}
                  </Input>
                  </FormGroup>
                  <Button>Send</Button>
                </Form>
              </ModalBody>
          </Modal>
      </>
    );
}