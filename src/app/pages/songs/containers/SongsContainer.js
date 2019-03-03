import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Songs from '../components/Songs';

import { adminOperations } from '../../../../reducers/admin';
import { artistsOperations } from '../../../../reducers/artists';
import { authOperations } from '../../../../reducers/auth';

const mapStateToProps = state => ({
  admin: state.admin,
  app: state.app,
  artists: state.artists,
  auth: state.auth,
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
  )(Songs)
);