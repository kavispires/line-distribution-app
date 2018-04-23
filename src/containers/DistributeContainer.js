import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Distribute from '../components/Distribute';

import {
  toggleIsLoading,
} from '../reducers/app';

import {
  boxMouseDown,
  boxMouseUp,
  calculateDuration,
  handleDecrease,
  loadSong,
  setDurations,
  setHistory,
  setPercentages,
  handleKeydown,
  handleKeyup,
  handleReset,
  toggleLyrics,
  handleUndo,
  toggleEditLyrics,
} from '../reducers/distribute';

import {
  handleParser,
} from '../reducers/lyrics';

const mapStateToProps = state => ({
  app: state.app,
  database: state.database,
  db: state.db,
  distribute: state.distribute,
  lyrics: state.lyrics,
  user: state.user,
});

const mapDispatchToProps = {
  boxMouseDown,
  boxMouseUp,
  calculateDuration,
  handleDecrease,
  setDurations,
  setHistory,
  setPercentages,
  handleKeydown,
  handleKeyup,
  handleReset,
  loadSong,
  toggleLyrics,
  handleUndo,
  handleParser,
  toggleEditLyrics,
  toggleIsLoading,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Distribute));
