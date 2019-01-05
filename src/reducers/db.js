import API from '../api';

import { setLoading } from './app';
import { parseResponseToObject } from '../utils';

/* ------------------   ACTIONS   ------------------ */

const SET_COLORS = 'SET_COLORS';

/* --------------   ACTION CREATORS   -------------- */

export const setColors = payload => dispatch =>
  dispatch({ type: SET_COLORS, payload });

/* -----------------   REDUCERS   ------------------ */

const initialState = {
  colors: {},
};

export default function reducer(prevState = initialState, action) {
  const newState = Object.assign({}, prevState);

  switch (action.type) {
    case SET_COLORS:
      newState.colors = action.payload;
      break;

    default:
      return prevState;
  }

  return newState;
}

/* ---------------   DISPATCHERS   ----------------- */

export const loadColors = () => async dispatch => {
  dispatch(setLoading(true, 'colors'));
  const allColors = await API.get('/colors');
  const colors = parseResponseToObject(allColors);

  dispatch(setColors(colors));

  dispatch(setLoading(false, 'colors'));
};
