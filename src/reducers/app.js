import { toastr } from 'react-redux-toastr';

import API from '../api';

/* ------------------   ACTIONS   ------------------ */

const SET_DATABASE_READY = 'SET_DATABASE_READY';
const SET_IS_LOADING = 'SET_IS_LOADING';

/* --------------   ACTION CREATORS   -------------- */

export const setDatabaseReady = payload => dispatch =>
  dispatch({ type: SET_DATABASE_READY, payload });
export const setIsLoading = payload => dispatch =>
  dispatch({ type: SET_IS_LOADING, payload });

/* -----------------   REDUCERS   ------------------ */

const initialState = {
  databaseReady: false,
  isLoading: false,
};

export default function reducer(prevState = initialState, action) {
  const newState = Object.assign({}, prevState);

  switch (action.type) {
    case SET_DATABASE_READY:
      newState.databaseReady = action.payload;
      break;

    case SET_IS_LOADING:
      newState.isLoading = action.payload;
      break;

    default:
      return prevState;
  }

  return newState;
}

/* ---------------   DISPATCHERS   ----------------- */

export const init = () => async dispatch => {
  dispatch(setLoading(true, 'init'));
  try {
    const dbStart = await API.init();
    const status = dbStart.dbInfo();
    await dispatch(setDatabaseReady(status.data.loaded));
  } catch (err) {
    toastr.error('Unable to reach database', err);
  } finally {
    dispatch(setLoading(false, 'init'));
  }
};

const loadingDict = {};

export const setLoading = (value, instance) => dispatch => {
  // Check if value and instance were passed as argument
  if (typeof instance !== 'string') {
    return console.error('Missing instance string');
  }
  if (typeof value !== 'boolean') {
    return console.error('Missing boolean value string');
  }

  // Check if instance is in the dictonary or not.
  if (loadingDict[instance] === undefined && value) {
    loadingDict[instance] = true;
    dispatch(setIsLoading(true));
  } else if (loadingDict[instance] && !value) {
    delete loadingDict[instance];
  }

  // If there are no loading instances, remove loading bar
  if (Object.keys(loadingDict).length === 0) {
    dispatch(setIsLoading(false));
  }
};
