import types from './types';

const setColors = payload => dispatch =>
  dispatch({ type: types.SET_COLORS, payload });
const setUIReferenceTab = payload => dispatch =>
  dispatch({ type: types.SET_UI_REFERENCE_TAB, payload });

export default {
  setColors,
  setUIReferenceTab,
};
