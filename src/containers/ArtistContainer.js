import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Artist from '../components/Artist';

import {
  switchUnitsTab,
  updateCurrentUnit,
  updateLatestUnits,
  updateSelectedUnit,
} from '../reducers/app';

const mapStateToProps = state => ({ app: state.app, database: state.database });

const mapDispatchToProps = {
  switchUnitsTab,
  updateCurrentUnit,
  updateLatestUnits,
  updateSelectedUnit,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Artist));
