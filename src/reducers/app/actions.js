import types from './types';

const resetError = payload => dispatch =>
  dispatch({ type: types.RESET_ERROR, payload });
const setDatabaseReady = payload => dispatch =>
  dispatch({ type: types.SET_DATABASE_READY, payload });
const setLoading = payload => dispatch =>
  dispatch({ type: types.SET_LOADING, payload });

export default {
  resetError,
  setDatabaseReady,
  setLoading,
};
