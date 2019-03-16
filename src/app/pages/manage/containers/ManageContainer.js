import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Manage from '../components/Manage';

import { adminOperations } from '../../../../reducers/admin';
import { dbOperations } from '../../../../reducers/db';

const mapStateToProps = state => ({
  admin: state.admin,
  app: state.app,
  auth: state.auth,
  db: state.db,
});

const mapDispatchToProps = {
  ...adminOperations,
  ...dbOperations,
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Manage)
);
