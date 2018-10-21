import { base } from '../firebase';

import { setLoading } from './app';

import API_CREATE from '../api/create';
import API_DESTROY from '../api/destroy';
import API_READ from '../api/read';
import API_UPDATE from '../api/update';

/* ------------------   FIREBASE   ----------------- */

let dbRef = null;
let DB = null;

/* ------------------   ACTIONS   ------------------ */

const SET_LOADED = 'SET_LOADED';

/* --------------   ACTION CREATORS   -------------- */

const setLoaded = payload => dispatch =>
  dispatch({ type: SET_LOADED, payload });

/* -----------------   REDUCERS   ------------------ */

const initialState = {
  loaded: false,
};

export default function reducer(prevState = initialState, action) {
  const newState = Object.assign({}, prevState);

  switch (action.type) {
    case SET_LOADED:
      newState.loaded = action.payload;
      break;

    default:
      return prevState;
  }

  return newState;
}

/* ---------------   DISPATCHERS   ----------------- */

export const initDB = () => dispatch => {
  dispatch(setLoading(true, 'db'));
  // Initiate firebase db
  dbRef = base.database().ref();
  const time = Date.now();

  dbRef.on('value', snap => {
    DB = snap.val();
    dispatch(setLoaded(true));
    dispatch(setLoading(false, 'db'));
    console.log(`Database successfully loaded in ${Date.now() - time} ms`); // eslint-disable-line
  });
};

/* -------------------   API   --------------------- */

export const API = {
  post: (path, body) => API_CREATE(path, body, DB),
  delete: path => API_DESTROY(path, DB),
  get: path => API_READ(path, DB),
  put: (path, body) => API_UPDATE(path, body, DB),
};
