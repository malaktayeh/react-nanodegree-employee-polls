import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { authedUserSelector, removeAuthedUser } from '../features/authedUserSlice';

function NavBar() {
  const dispatch = useDispatch();
  const { authedUser } = useSelector(authedUserSelector);

  const signOut = () => {
    dispatch(removeAuthedUser());
  };

  return (
    <Navbar bg="light" variant="light" expand="md" fixed="top" sticky="top">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>Employee Polls</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <LinkContainer to="/leaderboard">
              <Nav.Link>Leaderboard</Nav.Link>
            </LinkContainer>
            <NavDropdown title="Polls">
              <LinkContainer to="/add">
                <NavDropdown.Item>Add Poll</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/my-polls">
                <NavDropdown.Item>My Polls</NavDropdown.Item>
              </LinkContainer>
            </NavDropdown>
          </Nav>
          <NavDropdown title={authedUser.name} className="justify-content-end">
            <LinkContainer to="/settings">
              <NavDropdown.Item>Settings</NavDropdown.Item>
            </LinkContainer>
            <LinkContainer to="/profile">
              <NavDropdown.Item>My Profile</NavDropdown.Item>
            </LinkContainer>
            <NavDropdown.Divider />
            <LinkContainer to="/login" onClick={signOut}>
              <NavDropdown.Item>Logout</NavDropdown.Item>
            </LinkContainer>
          </NavDropdown>
          <Nav className="justify-content-end" />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
