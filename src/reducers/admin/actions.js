import types from './types';

const setColors = payload => dispatch =>
  dispatch({ type: types.SET_COLORS, payload });
const setEditingArtist = payload => dispatch =>
  dispatch({ type: types.SET_EDITING_ARTIST, payload });
const setEditingMembers = payload => dispatch =>
  dispatch({ type: types.SET_EDITING_MEMBERS, payload });
const setEditingUnit = payload => dispatch =>
  dispatch({ type: types.SET_EDITING_UNIT, payload });
const setUIReferenceTab = payload => dispatch =>
  dispatch({ type: types.SET_UI_REFERENCE_TAB, payload });

export default {
  setColors,
  setEditingArtist,
  setEditingMembers,
  setEditingUnit,
  setUIReferenceTab,
};
