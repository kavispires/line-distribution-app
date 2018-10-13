import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';

import AppContainer from './containers/AppContainer';
import HomeContainer from './containers/HomeContainer';

import './stylesheets/index.css';

const routes = (
  <Router>
    <div className="app">
      <AppContainer />
      <Route exact path="/" component={HomeContainer} />
    </div>
  </Router>
);

export default routes;
