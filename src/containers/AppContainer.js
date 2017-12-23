import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import App from '../components/App';

import { loadLocalStorage } from '../utils';

import {
	parseArtists,
	filter
} from '../reducers/app';

import {
	handleParser
} from '../reducers/lyrics';

const mapStateToProps = (state) => ({ app: state.app});

const mapDispatchToProps = {
	parseArtists,
	handleParser,
	filter,
	loadLocalStorage
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
