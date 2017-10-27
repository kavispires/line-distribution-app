import { KEYS } from '../constants';

/* ------------------   ACTIONS   ------------------ */

const SET_DECREASE = 'SET_DECREASE';
const SET_DURATIONS = 'SET_DURATIONS';
const SET_HISTORY = 'SET_HISTORY';
const SET_PERCENTAGES = 'SET_PERCENTAGES';
const SET_QUEUE = 'SET_QUEUE';
const SET_TOTAL = 'SET_TOTAL';
const SET_WHO = 'SET_WHO';

/* --------------   ACTION CREATORS   -------------- */

export const setDecrease = payload => dispatch => dispatch({ type: SET_DECREASE, payload });
export const setDurations = payload => dispatch => dispatch({ type: SET_DURATIONS, payload });
export const setHistory = payload => dispatch => dispatch({ type: SET_HISTORY, payload });
export const setPercentages = payload => dispatch => dispatch({ type: SET_PERCENTAGES, payload });
export const setQueue = payload => dispatch => dispatch({ type: SET_QUEUE, payload });
export const setTotal = payload => dispatch => dispatch({ type: SET_TOTAL, payload });
export const setWho = payload => dispatch => dispatch({ type: SET_WHO, payload });

/* -----------------   REDUCERS   ------------------ */

const initialState = {
  decrease: false,
  durations: [],
  history: [],
  percentages: [],
  queue: {},
  total: 0,
  who: []
};

export default function reducer(prevState = initialState, action) {

  const newState = Object.assign({}, prevState);

  switch (action.type) {

    case SET_QUEUE:
      newState.queue = action.payload;
      break;

    case SET_DECREASE:
      newState.decrease = action.payload;
      break;

    case SET_DURATIONS:
      newState.durations = action.payload;
      break;

    case SET_HISTORY:
      newState.history = action.payload;
      break;

    case SET_PERCENTAGES:
      newState.percentages = action.payload;
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

export const updateHistory = (entry, add = 'true', index) => (dispatch, getState) => {
  let history = [...getState().distribute.history];
  if (add) {
    history.unshift(entry);
    dispatch(setHistory(history));
  } else {
    history = history.filter((el, i) => i !== index);
    dispatch(setHistory(history));
  }
};

export const calculateDuration = (id, startTimestamp, timestamp = Date.now(), dehistory = false, index = null) => (dispatch, getState) => {
  // Calculate and set
  const decrease = getState().distribute.decrease;
  const duration = timestamp - startTimestamp;
  const durations = [...getState().distribute.durations];
  // Add or decrease
  if (decrease) {
    durations[id] -= duration;
    if (durations[id] < 0) durations[id] = 0;
    dispatch(setDecrease(false));
  } else {
    durations[id] += duration;
  }

  dispatch(setDurations(durations));
  // Calculate percentage
  const total = durations.reduce((a, b) => a + b);
  const percentages = durations.map(val => {
    return Math.round((val * 100) / total);
  });
  dispatch(setPercentages(percentages));
  // Add to who
  const who = [...getState().distribute.who];
  who.splice(getState().app.currentBand.members[id], 1);
  dispatch(setWho(who));
  // Add to history
  const entry = {
    memberId: id,
    duration
  };
  if (!dehistory) {
    dispatch(updateHistory(entry, true));
  } else {
    dispatch(updateHistory(entry, false, index));
  }
}

export const enqueueCapture = (id, timestamp = Date.now()) => (dispatch, getState) => {
  // Only if queue does NOT contains id
  if (getState().distribute.queue[id] === undefined) {
    const queue = Object.assign({},  getState().distribute.queue);
    queue[id] = timestamp;
    dispatch(setQueue(queue));
    // Add to who
    const who = [...getState().distribute.who];
    who.unshift(getState().app.currentBand.members[id]);
    dispatch(setWho(who));
  }
};

export const dequeueCapture  = (id, timestamp = Date.now()) => (dispatch, getState) => {
  // If queue contains id, set end and delete it from queue
  if (getState().distribute.queue[id] !== undefined) {
    const queue = Object.assign({},  getState().distribute.queue);
    // Get time and delete pair
    const startTimestamp = queue[id];
    delete queue[id];
    dispatch(setQueue(queue));
    // Calculate time
    dispatch(calculateDuration(id, startTimestamp, timestamp));
  }
};

export const boxMouseDown = (e) => (dispatch, getState) => {
  const timestamp = Date.now();
  let id = e.currentTarget.id;

  dispatch(enqueueCapture(id, timestamp));
};

export const boxMouseUp = (e) => (dispatch, getState) => {
  const timestamp = Date.now();
  let id = e.currentTarget.id;
  dispatch(dequeueCapture(id, timestamp));
};

export const handleReset = () => (dispatch, getState) => {
  const newArray = new Array(getState().app.currentBand.members.length).fill(0);
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
  console.log('Undo');
};

export const handleDecrease = () => (dispatch, getState) => {
  const decrease = getState().distribute.decrease;
  dispatch(setDecrease(!decrease));
};

export const handleFinish = () => (dispatch, getState) => {
  console.log('Finish');
};

export const handleKeydown = (e) => (dispatch, getState) => {
  if (KEYS[e.keyCode] !== undefined && KEYS[e.keyCode].id < getState().app.currentBand.members.length) {
    const key = KEYS[e.keyCode];
    console.log(key);
    dispatch(enqueueCapture(key.id));
  }
};

export const handleKeyup = (e) => (dispatch, getState) => {
  if (KEYS[e.keyCode] !== undefined) {
    const key = KEYS[e.keyCode];
    dispatch(dequeueCapture(key.id));
  }
};
