import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';

function Navigate(args) {
  return (
    <div>
      <Navbar>
        <NavbarBrand href="/">Librarian's Journal</NavbarBrand>
          <Nav className="me-auto" navbar>
            <NavItem>
              <NavLink href="/components/">Principles</NavLink>
            </NavItem>
          </Nav>
      </Navbar>
    </div>
  );
}

export default Navigate;