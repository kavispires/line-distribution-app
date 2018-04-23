import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import App from '../components/App';

import { loadLocalStorage } from '../utils';

import {
  init,
  setCurrentSong,
} from '../reducers/app';

import {
  initDB,
} from '../reducers/db';

import {
  handleParser,
  resetLyrics,
} from '../reducers/lyrics';

import {
  handleReset,
  resetDistribution,
} from '../reducers/distribute';

import {
  checkAuth,
  login,
  logout,
} from '../reducers/user';

const mapStateToProps = state => ({
  app: state.app,
  db: state.db,
  database: state.database,
  user: state.user,
});

const mapDispatchToProps = {
  checkAuth,
  handleParser,
  handleReset,
  initDB,
  loadLocalStorage,
  init,
  login,
  logout,
  resetDistribution,
  resetLyrics,
  setCurrentSong,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
