import types from './types';

const setActiveUnit = payload => dispatch =>
  dispatch({ type: types.SET_ACTIVE_UNIT, payload });
const setArtistList = payload => dispatch =>
  dispatch({ type: types.SET_ARTIST_LIST, payload });
const setArtistPageTab = payload => dispatch =>
  dispatch({ type: types.SET_ARTIST_PAGE_TAB, payload });
const setBias = payload => dispatch =>
  dispatch({ type: types.SET_BIAS, payload });
const setSearchQuery = payload => dispatch =>
  dispatch({ type: types.SET_SEARCH_QUERY, payload });
const setSelectedArtist = payload => dispatch =>
  dispatch({ type: types.SET_SELECTED_ARTIST, payload });
const setSelectedUnit = payload => dispatch =>
  dispatch({ type: types.SET_SELECTED_UNIT, payload });
const setShowFavoriteArtistsOnly = payload => dispatch =>
  dispatch({ type: types.SET_SHOW_FAVORITE_ARTISTS_ONLY, payload });

export default {
  setActiveUnit,
  setArtistList,
  setArtistPageTab,
  setBias,
  setSearchQuery,
  setSelectedArtist,
  setSelectedUnit,
  setShowFavoriteArtistsOnly,
};
