const loadArtists = () => dispatch => dispatch({ type: 'REQUEST_ARTISTS' });

const loadColors = () => dispatch => dispatch({ type: 'REQUEST_COLORS' });

const loadMembers = () => dispatch => dispatch({ type: 'REQUEST_MEMBERS' });

const loadSongs = () => dispatch => dispatch({ type: 'REQUEST_SONGS' });

export default {
  loadArtists,
  loadColors,
  loadMembers,
  loadSongs,
};
