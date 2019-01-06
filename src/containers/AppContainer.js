import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import App from '../components/App';

import { appOperations } from '../reducers/app';
import { authOperations } from '../reducers/auth';
import { dbOperations } from '../reducers/db';

const mapStateToProps = state => ({
  app: state.app,
  auth: state.auth,
  db: state.db,
});

const mapDispatchToProps = {
  init: appOperations.init,
  checkAuth: authOperations.checkAuth,
  loadColors: dbOperations.loadColors,
  login: authOperations.login,
  logout: authOperations.logout,
  setLoading: appOperations.setLoading,
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
