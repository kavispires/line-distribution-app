import types from './types';

const resetSync = payload => dispatch =>
  dispatch({ type: types.RESET_SYNC, payload });
const setActiveLine = payload => dispatch =>
  dispatch({ type: types.SET_ACTIVE_LINE, payload });
const setActivePill = payload => dispatch =>
  dispatch({ type: types.SET_ACTIVE_PILL, payload });
const setAreLyricsLocked = payload => dispatch =>
  dispatch({ type: types.SET_ARE_LYRICS_LOCKED, payload });
const setDistributionLines = payload => dispatch =>
  dispatch({ type: types.SET_DISTRIBUTION_LINES, payload });
const setFinalLyrics = payload => dispatch =>
  dispatch({ type: types.SET_FINAL_LYRICS, payload });
const setInfo = payload => dispatch =>
  dispatch({ type: types.SET_INFO, payload });
const setIsDistributionComplete = payload => dispatch =>
  dispatch({ type: types.SET_IS_DISTRIBUTION_COMPLETE, payload });
const setLinkSequenceMode = payload => dispatch =>
  dispatch({ type: types.SET_LINK_SEQUENCE_MODE, payload });
const setLastIdNum = payload => dispatch =>
  dispatch({ type: types.SET_LAST_ID_NUM, payload });
const setLyrics = payload => dispatch =>
  dispatch({ type: types.SET_LYRICS, payload });
const setPills = payload => dispatch =>
  dispatch({ type: types.SET_PILLS, payload });
const setQueue = payload => dispatch =>
  dispatch({ type: types.SET_QUEUE, payload });
const setStep = payload => dispatch =>
  dispatch({ type: types.SET_STEP, payload });
const setSteps = payload => dispatch =>
  dispatch({ type: types.SET_STEPS, payload });
const setSyncStats = payload => dispatch =>
  dispatch({ type: types.SET_SYNC_STATS, payload });
const setTimestamps = payload => dispatch =>
  dispatch({ type: types.SET_TIMESTAMPS, payload });
const setVideoId = payload => dispatch =>
  dispatch({ type: types.SET_VIDEO_ID, payload });

export default {
  resetSync,
  setActiveLine,
  setActivePill,
  setAreLyricsLocked,
  setDistributionLines,
  setFinalLyrics,
  setInfo,
  setIsDistributionComplete,
  setLinkSequenceMode,
  setLastIdNum,
  setLyrics,
  setPills,
  setQueue,
  setStep,
  setSteps,
  setSyncStats,
  setTimestamps,
  setVideoId,
};
