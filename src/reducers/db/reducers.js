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
  typeahead: {
    artists: [],
    members: [],
    units: [],
  },
};

export default function reducer(prevState = initialState, action) {
  const newState = Object.assign({}, prevState);

  switch (action.type) {
    case types.SET_ARTISTS:
      newState.artists = action.payload;
      break;

    case types.SET_ARTISTS_TYPEAHEAD:
      newState.typeahead.artists = action.payload;
      break;

    case types.SET_COLORS:
      newState.colors = action.payload;
      break;

    case types.SET_MEMBERS:
      newState.members = action.payload;
      break;

    case types.SET_MEMBERS_TYPEAHEAD:
      newState.typeahead.members = action.payload;
      break;

    case types.SET_SONGS:
      newState.songs = action.payload;
      break;

    case types.SET_UNIT_TYPEAHEAD:
      newState.typeahead.units = action.payload;
      break;

    default:
      return prevState;
  }

  return newState;
}
