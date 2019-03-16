import types from './types';

const setColorsInUse = payload => dispatch =>
  dispatch({ type: types.SET_COLORS_IN_USE, payload });
const setEditingArtist = payload => dispatch =>
  dispatch({ type: types.SET_EDITING_ARTIST, payload });
const setEditingMembers = payload => dispatch =>
  dispatch({ type: types.SET_EDITING_MEMBERS, payload });
const setEditingUnit = payload => dispatch =>
  dispatch({ type: types.SET_EDITING_UNIT, payload });
const setManageResult = payload => dispatch =>
  dispatch({ type: types.SET_MANAGE_RESULT, payload });
const setPanels = payload => dispatch =>
  dispatch({ type: types.SET_PANELS, payload });
const setSongSearchQuery = payload => dispatch =>
  dispatch({ type: types.SET_SONG_SEARCH_QUERY, payload });
const setUIReferenceTab = payload => dispatch =>
  dispatch({ type: types.SET_UI_REFERENCE_TAB, payload });
const setUnitsTypeahead = payload => dispatch =>
  dispatch({ type: types.SET_UNITS_TYPEAHEAD, payload });
const setUnitsTypeaheadDict = payload => dispatch =>
  dispatch({ type: types.SET_UNITS_TYPEAHEAD_DICT, payload });

export default {
  setColorsInUse,
  setEditingArtist,
  setEditingMembers,
  setEditingUnit,
  setManageResult,
  setPanels,
  setSongSearchQuery,
  setUIReferenceTab,
  setUnitsTypeahead,
  setUnitsTypeaheadDict,
};
