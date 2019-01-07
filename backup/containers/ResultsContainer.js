import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Results from '../components/Results';

import {
  calculateResults,
  handleOriginalArtist,
  handleSongTitle,
  handleSongType,
  handleSwitch,
  openSaveModal,
  saveSong,
  setResultType,
} from '../reducers/results';

import { login } from '../reducers/auth';

const mapStateToProps = state => ({
  app: state.app,
  auth: state.auth,
  db: state.db,
  distribute: state.distribute,
  results: state.results,
  lyrics: state.lyrics,
});

const mapDispatchToProps = {
  calculateResults,
  handleOriginalArtist,
  handleSongTitle,
  handleSongType,
  handleSwitch,
  login,
  openSaveModal,
  saveSong,
  setResultType,
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Results)
);
