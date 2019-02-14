import actions from './actions';

const loadArtists = () => dispatch => dispatch({ type: 'REQUEST_ARTISTS' });

const loadColors = () => dispatch => dispatch({ type: 'REQUEST_COLORS' });

const loadMembers = () => dispatch => dispatch({ type: 'REQUEST_MEMBERS' });

const switchUIReferenceTab = event => async dispatch => {
  const { id } = event.target;

  if (!id) return null;

  return dispatch(actions.setUIReferenceTab(id));
};

const handleEditArtist = artistId => dispatch => {
  // Fetch artist
  if (artistId) {
    dispatch({ type: 'REQUEST_ARTIST', artistId, state: 'edit' });
  } else {
    dispatch(actions.setEditingArtist({ state: 'edit', new: true }));
  }
};

const handleEditUnit = value => (dispatch, getState) => {
  console.log(value);
};

const updateEditArtistForm = formObj => dispatch => {
  if (formObj.dirty) {
    console.log('DIRTY');
    console.log(formObj);
  } else {
    console.log('CLEAN');
  }
};

export default {
  handleEditArtist,
  handleEditUnit,
  loadArtists,
  loadColors,
  loadMembers,
  switchUIReferenceTab,
  updateEditArtistForm,
};
