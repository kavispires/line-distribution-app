import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Lyrics from '../components/Lyrics';

import { artistsOperations } from '../../../../reducers/artists';
import { authOperations } from '../../../../reducers/auth';
import { dbOperations } from '../../../../reducers/db';

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
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Lyrics)
);
