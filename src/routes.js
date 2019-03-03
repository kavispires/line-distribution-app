import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';

import Artists from './app/pages/artists';
import Artist from './app/pages/artist';
import Header from './app/pages/header';
import Home from './app/pages/home';
import Idols from './app/pages/idols';
import Lyrics from './app/pages/lyrics';
import Manage from './app/pages/manage';
import Songs from './app/pages/songs';
import Sync from './app/pages/sync';
import UIReference from './app/pages/ui-reference';

import DistributeContainer from './containers/DistributeContainer';
import LabContainer from './containers/LabContainer';
import LearnMoreContainer from './containers/LearnMoreContainer';
import MyArtistsContainer from './containers/MyArtistsContainer';
import MyDistributionsContainer from './containers/MyDistributionsContainer';
import TempContainer from './containers/TempContainer';

import './stylesheets/index.css';

const routes = (
  <Router className="bola">
    <div className="app">
      <Header />
      <Route path="/artists/:artistId" component={Artist} />
      <Route exact path="/artists" component={Artists} />
      <Route path="/distribute" component={DistributeContainer} />
      <Route path="/idols" component={Idols} />
      <Route path="/lab" component={LabContainer} />
      <Route path="/learn-more" component={LearnMoreContainer} />
      <Route path="/lyrics" component={Lyrics} />
      <Route path="/songs" component={Songs} />

      <Route path="/admin/manage" component={Manage} />
      <Route path="/admin/sync" component={Sync} />
      <Route path="/admin/temp" component={TempContainer} />
      <Route path="/admin/ui-reference" component={UIReference} />

      <Route path="/user/my-artists" component={MyArtistsContainer} />
      <Route
        path="/user/my-distributions"
        component={MyDistributionsContainer}
      />

      <Route exact path="/" component={Home} />
    </div>
  </Router>
);

export default routes;
