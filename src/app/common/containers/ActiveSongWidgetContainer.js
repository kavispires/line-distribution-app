import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import ActiveSongWidget from '../components/ActiveSongWidget';

import { authOperations } from '../../../reducers/auth';

const mapStateToProps = state => ({
  app: state.app,
  artists: state.artists,
  auth: state.auth,
  distribution: state.distribution,
});

const mapDispatchToProps = {
  ...authOperations,
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ActiveSongWidget)
);
