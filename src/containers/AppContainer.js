import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import App from '../components/App';

import { loadLocalStorage } from '../utils';

import {
  setCurrentSong,
} from '../reducers/app';

import {
  toggleAdminTools,
} from '../reducers/admin';

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
  admin: state.admin,
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
  login,
  logout,
  resetDistribution,
  resetLyrics,
  setCurrentSong,
  toggleAdminTools,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
