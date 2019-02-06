import types from './types';

const setArtistList = payload => dispatch =>
  dispatch({ type: types.SET_ARTIST_LIST, payload });
const setArtistPageTab = payload => dispatch =>
  dispatch({ type: types.SET_ARTIST_PAGE_TAB, payload });
const setSearchQuery = payload => dispatch =>
  dispatch({ type: types.SET_SEARCH_QUERY, payload });
const setSelectedArtist = payload => dispatch =>
  dispatch({ type: types.SET_SELECTED_ARTIST, payload });
const setSelectedUnit = payload => dispatch =>
  dispatch({ type: types.SET_SELECTED_UNIT, payload });
const setShowFavoriteArtistsOnly = payload => dispatch =>
  dispatch({ type: types.SET_SHOW_FAVORITE_ARTISTS_ONLY, payload });

export default {
  setArtistList,
  setArtistPageTab,
  setSearchQuery,
  setSelectedArtist,
  setSelectedUnit,
  setShowFavoriteArtistsOnly,
};