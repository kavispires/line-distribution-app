import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Artist from '../components/Artist';

import { artistsOperations } from '../../../../reducers/artists';
import { authOperations } from '../../../../reducers/auth';
import { distributeOperations } from '../../../../reducers/distribute';

const mapStateToProps = state => ({
  app: state.app,
  artists: state.artists,
  auth: state.auth,
  distribute: state.distribute,
});

const mapDispatchToProps = {
  ...artistsOperations,
  ...authOperations,
  ...distributeOperations,
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Artist)
);
