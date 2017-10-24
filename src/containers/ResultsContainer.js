import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Results from '../components/Results';

import {
	calculateResults
} from '../reducers/results';

const mapStateToProps = (state) => ({ app: state.app, distribute: state.distribute, results: state.results });

const mapDispatchToProps = {
	calculateResults
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Results));
