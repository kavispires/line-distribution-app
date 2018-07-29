import { KEYS } from '../constants';

import { toggleIsLoading } from './app';
import { handleParser } from './lyrics';

/* ------------------   ACTIONS   ------------------ */

const SET_DURATIONS = 'SET_DURATIONS';
const SET_HISTORY = 'SET_HISTORY';
const SET_PERCENTAGES = 'SET_PERCENTAGES';
const SET_QUEUE = 'SET_QUEUE';
const SET_TOTAL = 'SET_TOTAL';
const SET_WHO = 'SET_WHO';
const EDIT_LYRICS = 'EDIT_LYRICS';
const SHOW_LYRICS = 'SHOW_LYRICS';

/* --------------   ACTION CREATORS   -------------- */

export const setDurations = payload => dispatch =>
  dispatch({ type: SET_DURATIONS, payload });
export const setHistory = payload => dispatch =>
  dispatch({ type: SET_HISTORY, payload });
export const setPercentages = payload => dispatch =>
  dispatch({ type: SET_PERCENTAGES, payload });
export const setQueue = payload => dispatch =>
  dispatch({ type: SET_QUEUE, payload });
export const setTotal = payload => dispatch =>
  dispatch({ type: SET_TOTAL, payload });
export const setWho = payload => dispatch =>
  dispatch({ type: SET_WHO, payload });
export const setEditLyrics = payload => dispatch =>
  dispatch({ type: EDIT_LYRICS, payload });
export const showLyrics = payload => dispatch =>
  dispatch({ type: SHOW_LYRICS, payload });

/* -----------------   REDUCERS   ------------------ */

const initialState = {
  durations: [],
  editLyrics: false,
  history: [],
  percentages: [],
  queue: {},
  showLyrics: false,
  total: 0,
  who: [],
};

export default function reducer(prevState = initialState, action) {
  const newState = Object.assign({}, prevState);

  switch (action.type) {
    case SET_DURATIONS:
      newState.durations = action.payload;
      break;

    case EDIT_LYRICS:
      newState.editLyrics = action.payload;
      break;

    case SET_HISTORY:
      newState.history = action.payload;
      break;

    case SET_PERCENTAGES:
      newState.percentages = action.payload;
      break;

    case SET_QUEUE:
      newState.queue = action.payload;
      break;

    case SHOW_LYRICS:
      newState.showLyrics = action.payload;
      break;

    case SET_TOTAL:
      newState.total = action.payload;
      break;

    case SET_WHO:
      newState.who = action.payload;
      break;

    default:
      return prevState;
  }

  return newState;
}

/* ---------------   DISPATCHERS   ----------------- */

export const updateHistory = (entry, add = 'true', index) => (
  dispatch,
  getState
) => {
  let history = [...getState().distribute.history];
  if (add) {
    history.unshift(entry);
    dispatch(setHistory(history));
  } else {
    history = history.filter((el, i) => i !== index);
    dispatch(setHistory(history));
  }
};

export const calculateDuration = (
  id,
  startTimestamp,
  timestamp = Date.now(),
  dehistory = false,
  index = null
) => (dispatch, getState) => {
  // Calculate and set
  const duration = timestamp - startTimestamp;
  const durations = [...getState().distribute.durations];
  const CURRENT_UNIT = getState().app.currentUnit;

  durations[id] += duration;
  dispatch(setDurations(durations));

  // Calculate percentage
  const total = durations.reduce((a, b) => a + b);
  const percentages = durations.map(val => Math.round((val * 100) / total));
  dispatch(setPercentages(percentages));

  // Add to who
  const who = [...getState().distribute.who];
  who.splice(CURRENT_UNIT.members[id], 1);
  dispatch(setWho(who));
  // Add to history
  const entry = {
    memberId: id,
    duration,
  };
  if (!dehistory) {
    dispatch(updateHistory(entry, true));
  } else {
    dispatch(updateHistory(entry, false, index));
  }
};

export const enqueueCapture = (id, timestamp = Date.now()) => (
  dispatch,
  getState
) => {
  if (getState().distribute.editLyrics) return;
  // Only if queue does NOT contains id
  if (getState().distribute.queue[id] === undefined) {
    const CURRENT_UNIT = getState().app.currentUnit;
    const queue = Object.assign({}, getState().distribute.queue);
    queue[id] = timestamp;
    dispatch(setQueue(queue));
    // Add to who
    const who = [...getState().distribute.who];
    who.unshift(CURRENT_UNIT.members[id].name);
    dispatch(setWho(who));
  }
};

export const dequeueCapture = (id, timestamp = Date.now()) => (
  dispatch,
  getState
) => {
  if (getState().distribute.editLyrics) return;
  // If queue contains id, set end and delete it from queue
  if (getState().distribute.queue[id] !== undefined) {
    const queue = Object.assign({}, getState().distribute.queue);
    // Get time and delete pair
    const startTimestamp = queue[id];
    delete queue[id];
    dispatch(setQueue(queue));
    // Calculate time
    dispatch(calculateDuration(id, startTimestamp, timestamp));
  }
};

export const boxMouseDown = e => (dispatch, getState) => {
  const timestamp = Date.now();
  const { id } = e.currentTarget;
  if (getState().distribute.editLyrics) return;
  dispatch(enqueueCapture(id, timestamp));
};

export const boxMouseUp = e => (dispatch, getState) => {
  const timestamp = Date.now();
  const { id } = e.currentTarget;
  if (getState().distribute.editLyrics) return;
  dispatch(dequeueCapture(id, timestamp));
};

export const handleReset = () => (dispatch, getState) => {
  const CURRENT_UNIT = getState().app.currentUnit;
  const newArray = new Array(CURRENT_UNIT.members.length).fill(0);
  // Clear queue
  dispatch(setQueue({}));
  // Clear durations
  dispatch(setDurations(newArray));
  // Clear percentages
  dispatch(setPercentages([...newArray]));
  // Clear history
  dispatch(setHistory([]));
};

export const resetDistribution = newUnit => (dispatch, getState) => {
  if (!newUnit) {
    newUnit = getState().app.currentUnit;
  }

  const newArray = new Array(newUnit.members.length).fill(0);
  // Clear queue
  dispatch(setQueue({}));
  // Clear durations
  dispatch(setDurations(newArray));
  // Clear percentages
  dispatch(setPercentages([...newArray]));
  // Clear history
  dispatch(setHistory([]));
};

export const handleUndo = () => (dispatch, getState) => {
  const { history } = getState().distribute;
  const removedNode = Object.assign({}, history[0]);
  dispatch(
    calculateDuration(removedNode.memberId, 0, -removedNode.duration, true, 0)
  );
};

export const handleKeydown = e => (dispatch, getState) => {
  const CURRENT_UNIT = getState().app.currentUnit;
  if (
    Object.keys(CURRENT_UNIT).length > 0 &&
    KEYS[e.keyCode] !== undefined &&
    KEYS[e.keyCode].id < CURRENT_UNIT.members.length
  ) {
    const key = KEYS[e.keyCode];
    dispatch(enqueueCapture(key.id));
  }
};

export const handleKeyup = e => dispatch => {
  if (KEYS[e.keyCode] !== undefined) {
    const key = KEYS[e.keyCode];
    dispatch(dequeueCapture(key.id));
  }
};

export const toggleLyrics = () => (dispatch, getState) => {
  const showLyricsState = getState().distribute.showLyrics;
  dispatch(showLyrics(!showLyricsState));
};

export const toggleEditLyrics = () => (dispatch, getState) => {
  const editLyricsState = getState().distribute.editLyrics;
  dispatch(setEditLyrics(!editLyricsState));
};

export const loadSong = () => (dispatch, getState) => {
  dispatch(toggleIsLoading(true));
  const SONG = getState().app.currentSong;
  const CURRENT_UNIT = getState().app.currentUnit;

  const memberIndexDict = {};
  CURRENT_UNIT.members.forEach((member, index) => {
    memberIndexDict[member.id] = index;
  });
  // Set lyrics
  dispatch(handleParser(SONG.lyrics));

  // TODO: It should load in reverse order
  for (let i = 0; i < SONG.distribution.length; i++) {
    const entry = SONG.distribution[i];
    const index = memberIndexDict[entry.memberId];
    dispatch(calculateDuration(index, 0, entry.duration));
  }
  // SONG.distribution.forEach((entry) => {
  //   const index = memberIndexDict[entry.memberId];
  //   dispatch(calculateDuration(index, 0, entry.duration));
  // });
  setTimeout(() => {
    dispatch(toggleIsLoading(false));
  }, 1500);
};
