import types from './types';

const apiAction = (type, payload = null) => dispatch =>
  dispatch({ type, payload });
const setDatabaseReady = payload => dispatch =>
  dispatch({ type: types.SET_DATABASE_READY, payload });
const setLoading = payload => dispatch =>
  dispatch({ type: types.SET_LOADING, payload });

export default {
  apiAction,
  setDatabaseReady,
  setLoading,
};
