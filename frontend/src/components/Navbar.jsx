import React from 'react';
import { NavLink } from 'react-router-dom';
import Routes from '../app/Routes';

export default function NavBar() {

  return (
    <nav>
      <p>Quesarion</p>
      <NavLink to={Routes.home}>Home</NavLink>
      <NavLink to={Routes.login}>Login</NavLink>
      <NavLink to={Routes.signup}>Signup</NavLink>
    </nav>
  );
}