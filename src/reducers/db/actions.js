import types from './types';

const setColors = payload => dispatch =>
  dispatch({ type: types.SET_COLORS, payload });
const setSongs = payload => dispatch =>
  dispatch({ type: types.SET_SONGS, payload });
const setSongSearchQuery = payload => dispatch =>
  dispatch({ type: types.SET_SONG_SEARCH_QUERY, payload });

export default {
  setColors,
  setSongs,
  setSongSearchQuery,
};
