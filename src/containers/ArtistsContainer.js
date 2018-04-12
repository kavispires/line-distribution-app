import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Artists from '../components/Artists';

import {
  filter,
  toggleIsLoading,
  updateCurrentUnit,
  updateLatestUnits,
  updateSelectedArtist,
  updateSelectedUnit,
  updateShouldReset,
} from '../reducers/app';

const mapStateToProps = state => ({ app: state.app, database: state.database });

const mapDispatchToProps = {
  filter,
  toggleIsLoading,
  updateCurrentUnit,
  updateLatestUnits,
  updateSelectedArtist,
  updateSelectedUnit,
  updateShouldReset,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Artists));
