import types from './types';

const resetError = payload => dispatch =>
  dispatch({ type: types.RESET_ERROR, payload });
const setDatabaseReady = payload => dispatch =>
  dispatch({ type: types.SET_DATABASE_READY, payload });

export default {
  resetError,
  setDatabaseReady,
};
