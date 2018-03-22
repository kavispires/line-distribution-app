import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Converter from '../components/Converter';

import {
  selectAction,
} from '../reducers/converter';

const mapStateToProps = state => ({ converter: state.converter, database: state.database });

const mapDispatchToProps = {
  selectAction,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Converter));