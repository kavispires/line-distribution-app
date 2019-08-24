import types from './types';

const setColors = payload => dispatch =>
  dispatch({ type: types.SET_COLORS, payload });
const setDBReload = payload => dispatch =>
  dispatch({ type: types.SET_DB_RELOAD, payload });
const setSongs = payload => dispatch =>
  dispatch({ type: types.SET_SONGS, payload });

export default {
  setColors,
  setDBReload,
  setSongs,
};
