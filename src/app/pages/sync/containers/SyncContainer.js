import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Sync from '../components/Sync';

import { artistsOperations } from '../../../../reducers/artists';
import { dbOperations } from '../../../../reducers/db';
import { syncOperations } from '../../../../reducers/sync';

const mapStateToProps = state => ({
  app: state.app,
  artists: state.artists,
  db: state.db,
  sync: state.sync,
});

const mapDispatchToProps = {
  ...artistsOperations,
  ...dbOperations,
  ...syncOperations,
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Sync)
);
