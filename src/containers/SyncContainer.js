import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Sync from '../components/Sync';

import {
  connectLine,
  connectPill,
  deletePill,
  finalizeLyrics,
  handleBoxMouseDown,
  handleBoxMouseUp,
  handleKeydown,
  handleKeyup,
  handleLyricsEdit,
  linkPillsSequence,
  lockLyrics,
  prepareLines,
  resetPillLinks,
  saveSong,
  setFinalLyrics,
  setIsLyricsLocked,
  updateForm,
  updateStep,
  updateVideoId,
} from '../reducers/sync';

const mapStateToProps = state => ({
  app: state.app,
  db: state.db,
  sync: state.sync,
  user: state.user,
});

const mapDispatchToProps = {
  connectLine,
  connectPill,
  deletePill,
  finalizeLyrics,
  handleBoxMouseDown,
  handleBoxMouseUp,
  handleKeydown,
  handleKeyup,
  handleLyricsEdit,
  linkPillsSequence,
  lockLyrics,
  prepareLines,
  resetPillLinks,
  saveSong,
  setFinalLyrics,
  setIsLyricsLocked,
  updateForm,
  updateStep,
  updateVideoId,
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Sync)
);
