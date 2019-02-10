import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Manage from '../components/Manage';

import { adminOperations } from '../../../../reducers/admin';

const mapStateToProps = state => ({
  admin: state.admin,
  app: state.app,
  auth: state.auth,
});

const mapDispatchToProps = {
  ...adminOperations,
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Manage)
);
