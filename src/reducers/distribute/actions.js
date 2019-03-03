import types from './types';

const setActiveSong = payload => dispatch =>
  dispatch({ type: types.SET_ACTIVE_SONG, payload });
const setActiveUnit = payload => dispatch =>
  dispatch({ type: types.SET_ACTIVE_UNIT, payload });

export default {
  setActiveSong,
  setActiveUnit,
};
