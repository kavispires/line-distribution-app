import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';

import AppContainer from './containers/AppContainer';
import ArtistContainer from './containers/ArtistContainer';
import ArtistsContainer from './containers/ArtistsContainer';
import ColorSheetContainer from './containers/ColorSheetContainer';
import CreatorContainer from './containers/CreatorContainer';
import DatabaseContainer from './containers/DatabaseContainer';
import DistributeContainer from './containers/DistributeContainer';
import HomeContainer from './containers/HomeContainer';
import IconSheetContainer from './containers/IconSheetContainer';
import LyricsContainer from './containers/LyricsContainer';
import ResultsContainer from './containers/ResultsContainer';
import RomanizerContainer from './containers/RomanizerContainer';
import SongsContainer from './containers/SongsContainer';
import TestContainer from './containers/TestContainer';

import './stylesheets/index.css';

const routes = (
  <Router>
    <div className="app">
      <AppContainer />
      <Route path="/artist/:artistId" component={ArtistContainer} />
      <Route path="/artists" component={ArtistsContainer} />

      <Route path="/distribute/create" component={TestContainer} />
      <Route path="/distribute/distribution" component={TestContainer} />
      <Route path="/distribute/lyrics" component={TestContainer} />
      <Route exact path="/distribute" component={DistributeContainer} />

      <Route path="/songs" component={SongsContainer} />

      <Route path="/admin/colorsheet" component={ColorSheetContainer} />
      <Route path="/admin/iconsheet" component={IconSheetContainer} />
      <Route path="/admin/manage" component={TestContainer} />
      <Route path="/admin/sync" component={TestContainer} />
      <Route path="/admin/test" component={TestContainer} />

      <Route exact path="/" component={HomeContainer} />

      <Route path="/admin/create" component={CreatorContainer} />
      <Route path="/admin/database" component={DatabaseContainer} />

      <Route path="/admin/romanizer" component={RomanizerContainer} />
      <Route path="/lyrics" component={LyricsContainer} />
    </div>
  </Router>
);

export default routes;
