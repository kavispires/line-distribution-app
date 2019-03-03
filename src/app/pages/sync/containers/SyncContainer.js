import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Sync from '../components/Sync';

import { adminOperations } from '../../../../reducers/admin';
import { artistsOperations } from '../../../../reducers/artists';
import { syncOperations } from '../../../../reducers/sync';

const mapStateToProps = state => ({
  admin: state.admin,
  app: state.app,
  artists: state.artists,
  sync: state.sync,
});

const mapDispatchToProps = {
  ...adminOperations,
  ...artistsOperations,
  ...syncOperations,
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Sync)
);
