import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Lyrics from '../components/Lyrics';

import {
	handleParser
} from '../reducers/lyrics';

const mapStateToProps = (state) => ({ app: state.app, lyrics: state.lyrics});

const mapDispatchToProps = {
	handleParser
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Lyrics));
