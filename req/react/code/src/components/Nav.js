import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';

export default function Navigate({changeMateria}) {
  return (
    <div>
      <Navbar>
        <NavbarBrand href="/">Librarian's Journal</NavbarBrand>
          <Nav className="me-auto" navbar>
            <NavItem>
              <NavLink onClick={() => changeMateria("principle")}>Principles</NavLink>
            </NavItem>
            <NavItem>
              <NavLink onClick={() => changeMateria("skill")}>Skills</NavLink>
            </NavItem>
            <NavItem>
              <NavLink onClick={() => changeMateria("skill_label")}>Skill Labels</NavLink>
            </NavItem>
            <NavItem>
              <NavLink onClick={() => changeMateria("object_label")}>Object Labels</NavLink>
            </NavItem>
              <NavLink onClick={() => changeMateria("tongue")}>Tongues</NavLink>
            <NavItem>
            </NavItem>
          </Nav>
      </Navbar>
    </div>
  );
}
