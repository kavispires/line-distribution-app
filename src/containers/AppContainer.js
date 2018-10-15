import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import App from '../components/App';

import { setIsLoading } from '../reducers/app';
import { loadArtists } from '../reducers/artists';
import { checkAuth, login, logout } from '../reducers/auth';
import { initDB } from '../reducers/db';

const mapStateToProps = state => ({
  app: state.app,
  auth: state.auth,
  db: state.db,
});

const mapDispatchToProps = {
  checkAuth,
  initDB,
  loadArtists,
  login,
  logout,
  setIsLoading,
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
