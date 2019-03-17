import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Distribute from '../components/Distribute';

import { adminOperations } from '../../../../reducers/admin';
import { artistsOperations } from '../../../../reducers/artists';
import { authOperations } from '../../../../reducers/auth';
import { distributeOperations } from '../../../../reducers/distribute';

const mapStateToProps = state => ({
  app: state.app,
  artists: state.artists,
  auth: state.auth,
  db: state.db,
  distribute: state.distribute,
});

const mapDispatchToProps = {
  ...adminOperations,
  ...artistsOperations,
  ...authOperations,
  ...distributeOperations,
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Distribute)
);
