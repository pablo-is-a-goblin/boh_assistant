import React, {useState} from "react";
import { Table, Accordion, AccordionBody, AccordionHeader, AccordionItem } from "reactstrap";


export default function SkillLabelAcordion({materia, changeTo}) {
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
        <AccordionHeader targetId="1">Skills with {materia.name}</AccordionHeader>
        <AccordionBody accordionId="1">
            <Table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <td>Primary Principle</td>
                        <td>Secondary Principle</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        materia.skill_set.map(skill => (
                            <tr>
                                <th>
                                <button
                                    className="button-as-link" 
                                    onClick={() => changeTo("skill", skill.pk)}>
                                {skill.name}</button>
                                </th>
                                <td>
                                <button
                                    className="button-as-link" 
                                    onClick={() => changeTo("principle", skill.principle1.pk)}>
                                {skill.principle1.name}</button>
                                </td>
                                <td>
                                <button
                                    className="button-as-link" 
                                    onClick={() => changeTo("principle", skill.principle2.pk)}>
                                {skill.principle2.name}</button>
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