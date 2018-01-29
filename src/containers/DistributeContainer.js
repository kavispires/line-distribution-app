import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Distribute from '../components/Distribute';

import {
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
  distribute: state.distribute,
  lyrics: state.lyrics,
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
  toggleLyrics,
  handleUndo,
  handleParser,
  toggleEditLyrics,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Distribute));
