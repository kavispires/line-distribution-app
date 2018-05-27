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

import {
  login,
} from '../reducers/user';

const mapStateToProps = state => ({
  app: state.app,
  db: state.db,
  lyrics: state.lyrics,
  user: state.user,
});

const mapDispatchToProps = {
  handleParser,
  login,
  setDurations,
  setHistory,
  setPercentages,
  toggleRules,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Lyrics));
