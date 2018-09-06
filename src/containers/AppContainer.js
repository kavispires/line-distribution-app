import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import App from '../components/App';

import { loadLocalStorage } from '../utils';

import { setCurrentSong } from '../reducers/app';

import { toggleAdminTools } from '../reducers/admin';

import { initDB } from '../reducers/db';

import { handleParser, resetLyrics } from '../reducers/lyrics';

import { handleReset, resetDistribution } from '../reducers/distribute';

import { checkAuth, login, logout } from '../reducers/auth';

const mapStateToProps = state => ({
  admin: state.admin,
  app: state.app,
  auth: state.auth,
  db: state.db,
  database: state.database,
  global: state.app.global,
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

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
