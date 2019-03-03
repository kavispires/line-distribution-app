import types from './types';

const initialState = {
  artists: [],
  artistsTypeahead: [],
  artistsTypeaheadDict: {},
  colors: {},
  colorsInUse: {},
  editingArtist: {},
  editingMembers: [],
  editingUnit: {},
  manageResult: null,
  members: [],
  membersTypeahead: [],
  panels: {
    artist: 'open',
    unit: 'locked',
    members: 'locked',
  },
  songs: [],
  songSearchQuery: '',
  uiReferenceTab: null,
  unitsTypeahead: [],
  unitsTypeaheadDict: {},
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

    case types.SET_COLORS_IN_USE:
      newState.colorsInUse = action.payload;
      break;

    case types.SET_EDITING_ARTIST:
      newState.editingArtist = action.payload;
      break;

    case types.SET_EDITING_MEMBERS:
      newState.editingMembers = action.payload;
      break;

    case types.SET_EDITING_UNIT:
      newState.editingUnit = action.payload;
      break;

    case types.SET_MANAGE_RESULT:
      newState.manageResult = action.payload;
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

    case types.SET_PANELS:
      newState.panels = action.payload;
      break;

    case types.SET_SONGS:
      newState.songs = action.payload;
      break;

    case types.SET_SONG_SEARCH_QUERY:
      newState.songSearchQuery = action.payload;
      break;

    case types.SET_UI_REFERENCE_TAB:
      newState.uiReferenceTab = action.payload;
      break;

    case types.SET_UNITS_TYPEAHEAD:
      newState.unitsTypeahead = action.payload;
      break;

    case types.SET_UNITS_TYPEAHEAD_DICT:
      newState.unitsTypeaheadDict = action.payload;
      break;

    default:
      return prevState;
  }

  return newState;
}
