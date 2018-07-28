import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Artists from '../components/Artists';

import {
  toggleIsLoading,
  updateCurrentUnit,
  updateGlobal,
  updateShouldReset,
} from '../reducers/app';

import {
  filterArtists,
  loadArtists,
  updateLatestUnits,
  updateSelectedArtist,
  updateSelectedUnit,
} from '../reducers/artists';

import { login } from '../reducers/user';

const mapStateToProps = state => ({
  app: state.app,
  artists: state.artists,
  db: state.db,
  user: state.user,
});

const mapDispatchToProps = {
  filterArtists,
  loadArtists,
  login,
  toggleIsLoading,
  updateCurrentUnit,
  updateGlobal,
  updateLatestUnits,
  updateSelectedArtist,
  updateSelectedUnit,
  updateShouldReset,
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Artists)
);
