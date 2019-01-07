import types from './types';

const setDatabaseReady = payload => dispatch =>
  dispatch({ type: types.SET_DATABASE_READY, payload });
const setIsLoading = payload => dispatch =>
  dispatch({ type: types.SET_IS_LOADING, payload });

export default {
  setDatabaseReady,
  setIsLoading,
};
