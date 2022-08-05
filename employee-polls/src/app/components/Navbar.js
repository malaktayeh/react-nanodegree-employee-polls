import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function NavBar() {
  return (
    <Navbar bg="light" variant="light" expand="md" fixed="top" sticky="top">
      <Container>
        <Navbar.Brand href="#">Employee Polls</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#leaderboard">Leaderboard</Nav.Link>
            <NavDropdown title="Polls">
              <NavDropdown.Item href="#add-poll">Add Poll</NavDropdown.Item>
              <NavDropdown.Item href="#my-polls">My Polls</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <NavDropdown title="Account" className="justify-content-end">
            <NavDropdown.Item href="#settings">Settings</NavDropdown.Item>
            <NavDropdown.Item href="#profile">My Profile</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#logout">Logout</NavDropdown.Item>
          </NavDropdown>
          <Nav className="justify-content-end" />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
