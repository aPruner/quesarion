import React from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import Navbar from '../components/Navbar';
import Routes from './Routes';

import Home from '../views/Home';
import Login from '../views/Login';
import Signup from '../views/Signup';

export default function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Route path={Routes.home} exact component={Home}/>
        <Route path={Routes.login} component={Login}/>
        <Route path={Routes.signup} component={Signup} />
      </Router>
    </>
  );
}