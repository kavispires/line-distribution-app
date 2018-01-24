import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import App from '../components/App';

import { loadLocalStorage } from '../utils';

import {
	init,
	filter
} from '../reducers/app';

import {
	handleParser
} from '../reducers/lyrics';

const mapStateToProps = (state) => ({ app: state.app});

const mapDispatchToProps = {
	init,
	handleParser,
	filter,
	loadLocalStorage
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
