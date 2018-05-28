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
import SongsContainer from './containers/SongsContainer';
import TestContainer from './containers/TestContainer';

import './stylesheets/index.css';

const routes = (
  <Router>
    <div className="app">
      <AppContainer />
      <Route path="/artist/:artistId" component={ArtistContainer} />
      <Route path="/artists" component={ArtistsContainer} />
      <Route path="/colorsheet" component={ColorSheetContainer} />
      <Route path="/create" component={CreatorContainer} />
      <Route path="/database" component={DatabaseContainer} />
      <Route path="/distribute" component={DistributeContainer} />
      <Route path="/iconsheet" component={IconSheetContainer} />
      <Route path="/lyrics" component={LyricsContainer} />
      <Route path="/results" component={ResultsContainer} />
      <Route path="/songs" component={SongsContainer} />
      <Route path="/test" component={TestContainer} />
      <Route exact path="/" component={HomeContainer} />
    </div>
  </Router>
);

export default routes;
