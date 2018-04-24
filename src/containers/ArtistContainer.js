import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Artist from '../components/Artist';

import {
  toggleIsLoading,
  updateCurrentSong,
  updateCurrentUnit,
  updateShouldReset,
} from '../reducers/app';

import {
  loadUserArtists,
  switchUnitsTab,
  updateFavoriteUnits,
  updateLatestUnits,
  updateSelectedArtist,
  updateSelectedUnit,
} from '../reducers/artists';

const mapStateToProps = state => ({
  app: state.app,
  artists: state.artists,
  db: state.db,
  user: state.user,
});

const mapDispatchToProps = {
  loadUserArtists,
  switchUnitsTab,
  toggleIsLoading,
  updateCurrentSong,
  updateCurrentUnit,
  updateFavoriteUnits,
  updateLatestUnits,
  updateSelectedArtist,
  updateSelectedUnit,
  updateShouldReset,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Artist));
