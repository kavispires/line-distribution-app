import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Home from '../components/Home';

import { authOperations } from '../reducers/auth';

const mapStateToProps = state => ({
  app: state.app,
  auth: state.auth,
  db: state.db,
});

const mapDispatchToProps = {
  login: authOperations.login,
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Home)
);
