import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Results from '../components/Results';

import {
	calculateResults,
	handleSwitch
} from '../reducers/results';

const mapStateToProps = (state) => ({ app: state.app, distribute: state.distribute, results: state.results });

const mapDispatchToProps = {
	calculateResults,
	handleSwitch
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Results));
