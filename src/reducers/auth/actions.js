import types from './types';

const setAdmin = payload => dispatch =>
  dispatch({ type: types.SET_ADMIN, payload });
const setAuthenticated = payload => dispatch =>
  dispatch({ type: types.SET_AUTHENTICATED, payload });
const setUser = payload => dispatch =>
  dispatch({ type: types.SET_USER, payload });

export default {
  setAdmin,
  setAuthenticated,
  setUser,
};
