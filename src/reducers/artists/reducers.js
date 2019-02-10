import types from './types';

const initialState = {
  artistList: [],
  artistPageTab: '',
  bias: {},
  searchQuery: '',
  selectedArtist: {},
  selectedUnit: {},
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

    case types.SET_ARTIST_PAGE_TAB:
      newState.artistPageTab = action.payload;
      break;

    case types.SET_BIAS:
      newState.bias = action.payload;
      break;

    case types.SET_SEARCH_QUERY:
      newState.searchQuery = action.payload;
      break;

    case types.SET_SELECTED_ARTIST:
      newState.selectedArtist = action.payload;
      break;

    case types.SET_SELECTED_UNIT:
      newState.selectedUnit = action.payload;
      break;

    case types.SET_SHOW_FAVORITE_ARTISTS_ONLY:
      newState.showFavoriteArtistsOnly = action.payload;
      break;

    default:
      return prevState;
  }

  return newState;
}
