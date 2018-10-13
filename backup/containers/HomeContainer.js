import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Home from '../components/Home';

import { login, logout } from '../reducers/auth';

const mapStateToProps = state => ({
  auth: state.auth,
  app: state.app,
  db: state.db,
});

const mapDispatchToProps = {
  login,
  logout,
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Home)
);
