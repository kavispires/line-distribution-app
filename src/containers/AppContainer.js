import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import App from '../components/App';

import {
	parseArtists
} from '../reducers/app';

const mapStateToProps = (state) => ({ app: state.app});

const mapDispatchToProps = {
	parseArtists
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));