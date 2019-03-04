import types from './types';

const setActiveMemberPill = payload => dispatch =>
  dispatch({ type: types.SET_ACTIVE_MEMBER_PILL, payload });
const setActiveSong = payload => dispatch =>
  dispatch({ type: types.SET_ACTIVE_SONG, payload });
const setActiveUnit = payload => dispatch =>
  dispatch({ type: types.SET_ACTIVE_UNIT, payload });
const setDistibutionLines = payload => dispatch =>
  dispatch({ type: types.SET_DISTRIBUTION_LINES, payload });
const setRates = payload => dispatch =>
  dispatch({ type: types.SET_RATES, payload });

export default {
  setActiveMemberPill,
  setActiveSong,
  setActiveUnit,
  setDistibutionLines,
  setRates,
};
