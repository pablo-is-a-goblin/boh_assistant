import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container,
} from 'reactstrap';
import { CONF } from '../constants';

export default function Navigate({changeMateria, changePk, materiaType}) {
  const links = [];
  for (let materia in CONF) {
    if (CONF[materia].type === materiaType)
      links.push(
    <NavItem key={materia}>
      <NavLink className="active" onClick={() => {changeMateria(materia); changePk("")}}>{CONF[materia].pretties}</NavLink>
    </NavItem>)
    else
      links.push(
      <NavItem key={materia}>
        <NavLink onClick={() => {changeMateria(materia); changePk("")}}>{CONF[materia].pretties}</NavLink>
      </NavItem>)
    }

  return (
    <Container style={{ paddingBottom: "100px" }}>
      <Navbar className="bg-light" fixed="top" expand="lg" style={{ paddingBottom: "30px" }}>
        <NavbarBrand href="/">The Librarian's Journal</NavbarBrand>
          <Nav className="me-auto" navbar>
            {links}
          </Nav>
      </Navbar >
    </Container>
  );
}
