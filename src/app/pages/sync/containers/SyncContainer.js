import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Sync from '../components/Sync';

import { adminOperations } from '../../../../reducers/admin';
import { artistsOperations } from '../../../../reducers/artists';
import { authOperations } from '../../../../reducers/auth';
import { syncOperations } from '../../../../reducers/sync';

const mapStateToProps = state => ({
  admin: state.admin,
  app: state.app,
  artists: state.artists,
  auth: state.auth,
  sync: state.sync,
});

const mapDispatchToProps = {
  ...adminOperations,
  ...artistsOperations,
  ...authOperations,
  ...syncOperations,
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Sync)
);
