import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';

function Navigate({changeMateria}) {
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
          </Nav>
      </Navbar>
    </div>
  );
}

export default Navigate;