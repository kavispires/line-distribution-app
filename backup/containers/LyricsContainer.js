import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Lyrics from '../components/Lyrics';

import { handleParser, toggleBrackets, toggleRules } from '../reducers/lyrics';

import {
  setDurations,
  setHistory,
  setPercentages,
} from '../reducers/distribute';

import { login } from '../reducers/auth';

const mapStateToProps = state => ({
  auth: state.auth,
  app: state.app,
  db: state.db,
  lyrics: state.lyrics,
});

const mapDispatchToProps = {
  handleParser,
  login,
  setDurations,
  setHistory,
  setPercentages,
  toggleBrackets,
  toggleRules,
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Lyrics)
);
