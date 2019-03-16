import types from './types';

const initialState = {
  artists: [],
  artistsTypeahead: [],
  artistsTypeaheadDict: {},
  colors: {},
  members: [],
  membersTypeahead: [],
  membersTypeaheadDict: {},
  songs: [],
  songSearchQuery: '',
};

export default function reducer(prevState = initialState, action) {
  const newState = Object.assign({}, prevState);

  switch (action.type) {
    case types.SET_ARTISTS:
      newState.artists = action.payload;
      break;

    case types.SET_ARTISTS_TYPEAHEAD:
      newState.artistsTypeahead = action.payload;
      break;

    case types.SET_ARTISTS_TYPEAHEAD_DICT:
      newState.artistsTypeaheadDict = action.payload;
      break;

    case types.SET_COLORS:
      newState.colors = action.payload;
      break;

    case types.SET_MEMBERS:
      newState.members = action.payload;
      break;

    case types.SET_MEMBERS_TYPEAHEAD:
      newState.membersTypeahead = action.payload;
      break;

    case types.SET_MEMBERS_TYPEAHEAD_DICT:
      newState.membersTypeaheadDict = action.payload;
      break;

    case types.SET_SONGS:
      newState.songs = action.payload;
      break;

    case types.SET_SONG_SEARCH_QUERY:
      newState.songSearchQuery = action.payload;
      break;

    default:
      return prevState;
  }

  return newState;
}
