import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Home from '../components/Home';

import {
	parseArtists
} from '../reducers/app';

const mapStateToProps = (state) => ({ app: state.app});

const mapDispatchToProps = {
	parseArtists
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));
