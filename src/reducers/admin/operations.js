import actions from './actions';

const loadArtists = () => dispatch => dispatch({ type: 'REQUEST_ARTISTS' });

const loadColors = () => dispatch => dispatch({ type: 'REQUEST_COLORS' });

const loadMembers = () => dispatch => dispatch({ type: 'REQUEST_MEMBERS' });

const switchUIReferenceTab = event => async dispatch => {
  const { id } = event.target;

  if (!id) return null;

  return dispatch(actions.setUIReferenceTab(id));
};

export default {
  loadArtists,
  loadColors,
  loadMembers,
  switchUIReferenceTab,
};
