import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Artists from '../components/Artists';

import {
  init,
  toggleIsLoading,
  updateCurrentUnit,
  updateSession,
  updateShouldReset,
} from '../reducers/app';

import {
  filterArtists,
  loadArtists,
  updateLatestUnits,
  updateSelectedArtist,
  updateSelectedUnit,
} from '../reducers/artists';

import { login } from '../reducers/auth';

const mapStateToProps = state => ({
  app: state.app,
  artists: state.artists,
  auth: state.auth,
  db: state.db,
});

const mapDispatchToProps = {
  filterArtists,
  loadArtists,
  init,
  login,
  toggleIsLoading,
  updateCurrentUnit,
  updateLatestUnits,
  updateSelectedArtist,
  updateSelectedUnit,
  updateSession,
  updateShouldReset,
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Artists)
);
