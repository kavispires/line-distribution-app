import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Header from '../components/Header';

import { appOperations } from '../../../../reducers/app';
import { authOperations } from '../../../../reducers/auth';
import { dbOperations } from '../../../../reducers/db';

const mapStateToProps = state => ({
  app: state.app,
  auth: state.auth,
});

const mapDispatchToProps = {
  ...appOperations,
  ...authOperations,
  ...dbOperations,
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Header)
);
