import types from './types';

const initialState = {
  artists: [],
  colors: {},
  members: [],
  songs: [],
  // Indicates when bulk get requests should be performed
  reload: {
    artists: true,
    colors: true,
    members: true,
    songs: true,
  },
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
      newState.reload.artists = false;
      break;

    case types.SET_ARTISTS_TYPEAHEAD:
      newState.typeahead.artists = action.payload;
      break;

    case types.SET_COLORS:
      newState.colors = action.payload;
      newState.reload.colors = false;
      break;

    case types.SET_DB_RELOAD:
      newState.reload = {
        ...newState.reload,
        ...action.payload,
      };
      break;

    case types.SET_MEMBERS:
      newState.members = action.payload;
      newState.reload.members = false;
      break;

    case types.SET_MEMBERS_TYPEAHEAD:
      newState.typeahead.members = action.payload;
      break;

    case types.SET_SONGS:
      newState.songs = action.payload;
      newState.reload.songs = false;
      break;

    case types.SET_UNIT_TYPEAHEAD:
      newState.typeahead.units = action.payload;
      break;

    default:
      return prevState;
  }
  return newState;
}
