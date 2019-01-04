import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';

import AppContainer from './containers/AppContainer';
import ArtistContainer from './containers/ArtistContainer';
import ArtistsContainer from './containers/ArtistsContainer';
import ColorSheetContainer from './containers/ColorSheetContainer';
import DistributeContainer from './containers/DistributeContainer';
import HomeContainer from './containers/HomeContainer';
import IconSheetContainer from './containers/IconSheetContainer';
import LabContainer from './containers/LabContainer';
import LearnMoreContainer from './containers/LearnMoreContainer';
import ManageContainer from './containers/ManageContainer';
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
      <AppContainer />
      <Route path="/artists/:artistId" component={ArtistContainer} />
      <Route exact path="/artists" component={ArtistsContainer} />
      <Route path="/distribute" component={DistributeContainer} />
      <Route path="/lab" component={LabContainer} />
      <Route path="/learn-more" component={LearnMoreContainer} />
      <Route path="/member/:memberId" component={MemberContainer} />
      <Route path="/members" component={MembersContainer} />
      <Route path="/songs" component={SongsContainer} />

      <Route path="/admin/color-sheet" component={ColorSheetContainer} />
      <Route path="/admin/icon-sheet" component={IconSheetContainer} />
      <Route path="/admin/manage" component={ManageContainer} />
      <Route path="/admin/sync" component={SyncContainer} />
      <Route path="/admin/temp" component={TempContainer} />

      <Route path="/user/my-artists" component={MyArtistsContainer} />
      <Route
        path="/user/my-distributions"
        component={MyDistributionsContainer}
      />

      <Route exact path="/" component={HomeContainer} />
    </div>
  </Router>
);

export default routes;
