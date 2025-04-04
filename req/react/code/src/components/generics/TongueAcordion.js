import React, {useState} from "react";
import { Table, Accordion, AccordionBody, AccordionHeader, AccordionItem } from "reactstrap";


export default function TongueAcordion({materia, changeTo}) {
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
        <AccordionHeader targetId="1">Books written in {materia.name}</AccordionHeader>
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
    </Accordion>
)

}