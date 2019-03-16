import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Songs from '../components/Songs';

import { artistsOperations } from '../../../../reducers/artists';
import { authOperations } from '../../../../reducers/auth';
import { dbOperations } from '../../../../reducers/db';
import { distributeOperations } from '../../../../reducers/distribute';

const mapStateToProps = state => ({
  app: state.app,
  artists: state.artists,
  auth: state.auth,
  db: state.db,
  distribute: state.distribute,
});

const mapDispatchToProps = {
  ...artistsOperations,
  ...authOperations,
  ...dbOperations,
  ...distributeOperations,
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Songs)
);
