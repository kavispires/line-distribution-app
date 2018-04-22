import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Artists from '../components/Artists';

import {
  toggleIsLoading,
  updateCurrentUnit,
  updateLatestUnits,
  updateShouldReset,
} from '../reducers/app';

import {
  filterArtists,
  loadArtists,
  updateSelectedArtist,
  updateSelectedUnit,
} from '../reducers/artists';

const mapStateToProps = state => ({
  app: state.app,
  artists: state.artists,
  db: state.db,
});

const mapDispatchToProps = {
  filterArtists,
  loadArtists,
  toggleIsLoading,
  updateCurrentUnit,
  updateLatestUnits,
  updateSelectedArtist,
  updateSelectedUnit,
  updateShouldReset,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Artists));
