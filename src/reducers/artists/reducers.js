import types from './types';

const initialState = {
  artistList: [],
  searchQuery: '',
  selectedArtist: {},
  showFavoriteArtistsOnly: false,
  userFavoriteArtists: {},
  userLatestArtists: [],
};

export default function reducer(prevState = initialState, action) {
  const newState = Object.assign({}, prevState);

  switch (action.type) {
    case types.SET_ARTIST_LIST:
      newState.artistList = action.payload;
      break;

    case types.SET_SEARCH_QUERY:
      newState.searchQuery = action.payload;
      break;

    case types.SET_SELECTED_ARTIST:
      newState.selectedArtist = action.payload;
      break;

    case types.SET_SHOW_FAVORITE_ARTISTS_ONLY:
      newState.showFavoriteArtistsOnly = action.payload;
      break;

    default:
      return prevState;
  }

  return newState;
}
