import actions from './actions';

const loadArtists = () => dispatch => dispatch({ type: 'REQUEST_ARTISTS' });

const loadColors = () => dispatch => dispatch({ type: 'REQUEST_COLORS' });

const loadMembers = () => dispatch => dispatch({ type: 'REQUEST_MEMBERS' });

const loadSongs = () => dispatch => dispatch({ type: 'REQUEST_SONGS' });

const resetSongSearchQuery = () => dispatch =>
  dispatch(actions.setSongSearchQuery(''));

const updateSongSearchQuery = value => dispatch =>
  dispatch(actions.setSongSearchQuery(value));

export default {
  loadArtists,
  loadColors,
  loadMembers,
  loadSongs,
  resetSongSearchQuery,
  updateSongSearchQuery,
};
