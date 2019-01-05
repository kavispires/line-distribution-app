import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import App from '../components/App';

import { init, setLoading } from '../reducers/app';
import { checkAuth, login, logout } from '../reducers/auth';
import { loadColors } from '../reducers/db';

const mapStateToProps = state => ({
  app: state.app,
  auth: state.auth,
  db: state.db,
});

const mapDispatchToProps = {
  init,
  checkAuth,
  loadColors,
  login,
  logout,
  setLoading,
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
