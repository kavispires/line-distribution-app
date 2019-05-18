import types from './types';

const setColors = payload => dispatch =>
  dispatch({ type: types.SET_COLORS, payload });
const setSongs = payload => dispatch =>
  dispatch({ type: types.SET_SONGS, payload });

export default {
  setColors,
  setSongs,
};
