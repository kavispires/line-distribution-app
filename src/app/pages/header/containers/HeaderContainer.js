import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Header from '../components/Header';

import { appOperations } from '../../../../reducers/app';
import { authOperations } from '../../../../reducers/auth';

const mapStateToProps = state => ({
  app: state.app,
  auth: state.auth,
});

const mapDispatchToProps = {
  ...appOperations,
  ...authOperations,
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Header)
);
