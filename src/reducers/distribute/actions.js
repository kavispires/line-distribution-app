import types from './types';

const setActiveSong = payload => dispatch =>
  dispatch({ type: types.SET_ACTIVE_SONG, payload });

export default {
  setActiveSong,
};
