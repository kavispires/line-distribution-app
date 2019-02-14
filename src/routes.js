import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';

import Header from './app/pages/header';
import Home from './app/pages/home';
import Artists from './app/pages/artists';
import Artist from './app/pages/artist';
import UIReference from './app/pages/ui-reference';
import Manage from './app/pages/manage';

import DistributeContainer from './containers/DistributeContainer';
import LabContainer from './containers/LabContainer';
import LearnMoreContainer from './containers/LearnMoreContainer';
import MemberContainer from './containers/MemberContainer';
import MembersContainer from './containers/MembersContainer';
import MyArtistsContainer from './containers/MyArtistsContainer';
import MyDistributionsContainer from './containers/MyDistributionsContainer';
import SongsContainer from './containers/SongsContainer';
import SyncContainer from './containers/SyncContainer';
import TempContainer from './containers/TempContainer';

import './stylesheets/index.css';

const routes = (
  <Router>
    <div className="app">
      <Header />
      <Route path="/artists/:artistId" component={Artist} />
      <Route exact path="/artists" component={Artists} />
      <Route path="/distribute" component={DistributeContainer} />
      <Route path="/lab" component={LabContainer} />
      <Route path="/learn-more" component={LearnMoreContainer} />
      <Route path="/member/:memberId" component={MemberContainer} />
      <Route path="/members" component={MembersContainer} />
      <Route path="/songs" component={SongsContainer} />

      <Route path="/admin/manage" component={Manage} />
      <Route path="/admin/sync" component={SyncContainer} />
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
