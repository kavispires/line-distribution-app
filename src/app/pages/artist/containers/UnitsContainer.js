import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Units from '../components/Units';

import { artistsOperations } from '../../../../reducers/artists';
import { authOperations } from '../../../../reducers/auth';

const mapStateToProps = state => ({
  app: state.app,
  artists: state.artists,
  auth: state.auth,
});

const mapDispatchToProps = {
  ...artistsOperations,
  ...authOperations,
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Units)
);
