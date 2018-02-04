import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Lyrics from '../components/Lyrics';

import {
  handleParser,
  toggleRules,
} from '../reducers/lyrics';

import {
  setDurations,
  setHistory,
  setPercentages,
} from '../reducers/distribute';

const mapStateToProps = state => ({ app: state.app, lyrics: state.lyrics });

const mapDispatchToProps = {
  handleParser,
  setDurations,
  setHistory,
  setPercentages,
  toggleRules,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Lyrics));
