import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Lyrics from '../components/Lyrics';

import { adminOperations } from '../../../../reducers/admin';
import { artistsOperations } from '../../../../reducers/artists';
import { authOperations } from '../../../../reducers/auth';

const mapStateToProps = state => ({
  admin: state.admin,
  app: state.app,
  artists: state.artists,
  auth: state.auth,
  distribute: state.distribute,
});

const mapDispatchToProps = {
  ...adminOperations,
  ...artistsOperations,
  ...authOperations,
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Lyrics)
);
