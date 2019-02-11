import types from './types';

const initialState = {
  artists: [],
  artistsTypeahead: [],
  colors: {},
  members: [],
  membersTypeahead: [],
  uiReferenceTab: null,
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

    case types.SET_UI_REFERENCE_TAB:
      newState.uiReferenceTab = action.payload;
      break;

    default:
      return prevState;
  }

  return newState;
}
