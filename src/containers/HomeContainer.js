import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Home from '../components/Home';

import { login, logout } from '../reducers/user';

const mapStateToProps = state => ({
  app: state.app,
  db: state.db,
  user: state.user,
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
