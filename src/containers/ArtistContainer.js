import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Artist from '../components/Artist';

import {
  switchUnitsTab,
  updateCurrentUnit,
} from '../reducers/app';

const mapStateToProps = state => ({ app: state.app, database: state.database });

const mapDispatchToProps = {
  switchUnitsTab,
  updateCurrentUnit,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Artist));
