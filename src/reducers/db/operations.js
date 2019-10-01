/**
 * Trigger saga to fetch artists from the database if reloaded is necessary
 * @category Reducer Operator
 * @dispatches list of artists
 */
const loadArtists = () => (dispatch, getState) => {
  const { reload } = getState().db;
  const { isAuthenticated } = getState().auth;

  if (reload.artists && isAuthenticated) {
    dispatch({ type: 'REQUEST_ARTISTS' });
  }
};

/**
 * Trigger saga to fetch colors from the database if reloaded is necessary
 * @category Reducer Operator
 * @dispatches list of colors
 */
const loadColors = () => (dispatch, getState) => {
  const { reload } = getState().db;
  const { isAuthenticated } = getState().auth;

  if (reload.colors && isAuthenticated) {
    dispatch({ type: 'REQUEST_COLORS' });
  }
};

/**
 * Trigger saga to fetch members from the database if reloaded is necessary
 * @category Reducer Operator
 * @dispatches list of members
 */
const loadMembers = () => (dispatch, getState) => {
  const { reload } = getState().db;
  const { isAuthenticated } = getState().auth;

  if (reload.members && isAuthenticated) {
    dispatch({ type: 'REQUEST_MEMBERS' });
  }
};

/**
 * Trigger saga to fetch songs from the database if reloaded is necessary
 * @category Reducer Operator
 * @dispatches list of songs
 */
const loadSongs = () => (dispatch, getState) => {
  const { reload } = getState().db;
  const { isAuthenticated } = getState().auth;

  if (reload.songs && isAuthenticated) {
    dispatch({ type: 'REQUEST_SONGS' });
  }
};

/**
 * Trigger saga to update members from the database
 * @category Reducer Operator
 * @dispatches member
 */
const updateMember = member => dispatch => {
  dispatch({ type: 'UPDATE_MEMBER', member });
};

export default {
  loadArtists,
  loadColors,
  loadMembers,
  loadSongs,
  updateMember,
};
