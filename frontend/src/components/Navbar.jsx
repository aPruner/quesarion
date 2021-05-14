import React from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import Routes from '../app/Routes';

export default function NavBar() {

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand>Quesarion</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link>
            <NavLink to={Routes.home}>Home</NavLink>
          </Nav.Link>
          <Nav.Link>
            <NavLink to={Routes.login}>Login</NavLink>
          </Nav.Link>
          <Nav.Link>
            <NavLink to={Routes.signup}>Signup</NavLink>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}