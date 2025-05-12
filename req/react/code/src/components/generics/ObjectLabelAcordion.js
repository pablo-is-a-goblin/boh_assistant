import React, {useState} from "react";
import { Table, Accordion, AccordionBody, AccordionHeader, AccordionItem } from "reactstrap";


export default function ObjectLabelAcordion({materia, changeTo}) {
    const [open, setOpen] = useState();
    const toggle = (id) => {
        if (open === id) {
          setOpen();
        } else {
          setOpen(id);
        }
      };

return (
    <Accordion open={open} toggle={toggle}>
    <AccordionItem>
        <AccordionHeader targetId="1">Objects with {materia.name}</AccordionHeader>
        <AccordionBody accordionId="1">
            <Table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <td>Principles</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        materia.object_set.map(object => (
                            <tr>
                                <th>
                                <button
                                    className="button-as-link" 
                                    onClick={() => changeTo(object.object_type.toLowerCase(), object.pk)}>
                                {object.name}</button>
                                </th>
                                <td>
                                {
                                    object.principles.map(principle => (
                                <button
                                    className="button-as-link" 
                                    onClick={() => changeTo("principle", principle.principle.pk)}>
                                {principle.qty} {principle.principle.name}</button>
                                    ))
                                }
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
        </AccordionBody>
    </AccordionItem>
    </Accordion>
)

}