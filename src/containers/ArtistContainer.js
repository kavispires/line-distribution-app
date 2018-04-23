import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Artist from '../components/Artist';

import {
  toggleIsLoading,
  updateCurrentSong,
  updateCurrentUnit,
  updateLatestUnits,
  updateShouldReset,
} from '../reducers/app';

import {
  switchUnitsTab,
  updateSelectedArtist,
  updateSelectedUnit,
} from '../reducers/artists';

const mapStateToProps = state => ({
  app: state.app,
  artists: state.artists,
  db: state.db,
  database: state.database,
  user: state.user,
});

const mapDispatchToProps = {
  switchUnitsTab,
  toggleIsLoading,
  updateCurrentSong,
  updateCurrentUnit,
  updateLatestUnits,
  updateSelectedArtist,
  updateSelectedUnit,
  updateShouldReset,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Artist));
