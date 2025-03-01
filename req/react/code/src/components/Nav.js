import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import { CONF } from '../constants';

export default function Navigate({changeMateria}) {
  const links = [];
  for (let materia in CONF) {
    links.push(
    <NavItem key={materia}>
      <NavLink onClick={() => changeMateria(materia)}>{CONF[materia].pretties}</NavLink>
    </NavItem>
    )}

  return (
    <div>
      <Navbar expand="lg">
        <NavbarBrand href="/">The Librarian's Journal</NavbarBrand>
          <Nav className="me-auto" navbar>
            {links}
          </Nav>
      </Navbar>
    </div>
  );
}
