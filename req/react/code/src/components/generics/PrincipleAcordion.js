import React, {useState} from "react";
import { Table, Accordion, AccordionBody, AccordionHeader, AccordionItem } from "reactstrap";


export default function PrincipleAcordion({materia, changeTo}) {
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
        <AccordionHeader targetId="1">Books with a {materia.name} mistery</AccordionHeader>
        <AccordionBody accordionId="1">
            <Table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <td>Difficulty</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        materia.book_set.map(book => (
                            <tr>
                                <th>
                                <button
                                    className="button-as-link" 
                                    onClick={() => changeTo("book", book.pk)}>
                                {book.name}</button>
                                </th>
                                <td>{book.dificulty}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
        </AccordionBody>
    </AccordionItem>
    <AccordionItem>
        <AccordionHeader targetId="2">Skills with {materia.name}</AccordionHeader>
        <AccordionBody accordionId="2">
            <Table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <td>Principles</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        materia.primary_principle.map(skill => (
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
                                <i className="bi bi-suit-diamond-fill"></i>
                                <button
                                    className="button-as-link" 
                                    onClick={() => changeTo("principle", skill.principle2.pk)}>
                                {skill.principle2.name}</button>
                                </td>
                            </tr>
                        ))
                    }{
                        materia.secondary_principle.map(skill => (
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
                                <i className="bi bi-suit-diamond-fill"></i>
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