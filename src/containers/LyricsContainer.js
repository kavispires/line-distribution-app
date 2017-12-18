import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Lyrics from '../components/Lyrics';

import {
	handleParser,
	toggleRules
} from '../reducers/lyrics';

const mapStateToProps = (state) => ({ app: state.app, lyrics: state.lyrics});

const mapDispatchToProps = {
	handleParser,
	toggleRules
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Lyrics));
