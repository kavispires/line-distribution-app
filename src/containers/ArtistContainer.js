import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Artist from '../components/Artist';

import {
  switchUnitsTab,
  toggleIsLoading,
  updateCurrentSong,
  updateCurrentUnit,
  updateLatestUnits,
  updateSelectedArtist,
  updateSelectedUnit,
  updateShouldReset,
} from '../reducers/app';

const mapStateToProps = state => ({ app: state.app, database: state.database });

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
