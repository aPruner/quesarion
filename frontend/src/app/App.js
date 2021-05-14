import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import { ThemeProvider } from 'theme-ui';
import Navbar from '../components/Navbar';
import Routes from './Routes';

import theme from './Theme';
import Home from '../views/Home';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Navbar />
        <Switch>
          <Route path={Routes.home}>
            <Home />
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}