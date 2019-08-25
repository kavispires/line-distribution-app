import types from './types';

const setArtistList = payload => dispatch =>
  dispatch({ type: types.SET_ARTIST_LIST, payload });
const setArtistPageTab = payload => dispatch =>
  dispatch({ type: types.SET_ARTIST_PAGE_TAB, payload });
const setBias = payload => dispatch =>
  dispatch({ type: types.SET_BIAS, payload });
const setSelectedArtist = payload => dispatch =>
  dispatch({ type: types.SET_SELECTED_ARTIST, payload });
const setSelectedUnit = payload => dispatch =>
  dispatch({ type: types.SET_SELECTED_UNIT, payload });

export default {
  setArtistList,
  setArtistPageTab,
  setBias,
  setSelectedArtist,
  setSelectedUnit,
};
