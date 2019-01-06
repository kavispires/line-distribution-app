import types from './types';

const setArtistList = payload => dispatch =>
  dispatch({ type: types.SET_ARTIST_LIST, payload });
const setSearchQuery = payload => dispatch =>
  dispatch({ type: types.SET_SEARCH_QUERY, payload });

export default {
  setArtistList,
  setSearchQuery,
};
