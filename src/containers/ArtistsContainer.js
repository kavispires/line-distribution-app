import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Artists from '../components/Artists';

import {
	updateCurrentBand
} from '../reducers/app';

const mapStateToProps = (state) => ({ app: state.app});

const mapDispatchToProps = {
	updateCurrentBand
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Artists));
