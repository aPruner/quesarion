import React from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import { createUseStyles } from 'react-jss';
import Routes from '../app/Routes';

const useStyles = createUseStyles({
  navLinkContainer: {
    margin: '0 10px 0'
  }
});

export default function NavBar() {
  const classes = useStyles();
  const navLinks = Object.keys(Routes).map(routeKey => {
    const {
      path,
      linkText
    } = Routes[routeKey];
    return (
      <Nav className={classes.navLinkContainer} key={linkText}>
        <NavLink to={path}>{linkText}</NavLink>
      </Nav>
    );
  });

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand>Quesarion</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          {navLinks}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}