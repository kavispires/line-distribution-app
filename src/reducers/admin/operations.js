import actions from './actions';

const loadArtists = () => dispatch => dispatch({ type: 'REQUEST_ARTISTS' });

const loadColors = () => dispatch => dispatch({ type: 'REQUEST_COLORS' });

const loadMembers = () => dispatch => dispatch({ type: 'REQUEST_MEMBERS' });

const switchUIReferenceTab = event => async dispatch => {
  const { id } = event.target;

  if (!id) return null;

  return dispatch(actions.setUIReferenceTab(id));
};

const handleEditArtist = artistId => (dispatch, getState) => {
  const panels = { ...getState().admin.panels };

  panels.artist = 'edit';

  if (artistId) {
    dispatch({ type: 'REQUEST_ARTIST', artistId, panels, state: 'edit' });
  } else {
    dispatch(actions.setEditingArtist({ new: true }));
    dispatch(actions.setPanels(panels));
  }
};

const handleEditUnit = value => (dispatch, getState) => {
  console.log(value);
};

const updateManageForm = formObj => dispatch => {
  console.log(formObj);
  if (formObj.dirty) {
    // console.log('DIRTY');
    // console.log(formObj);
  } else {
    // console.log('CLEAN');
  }
};

const unlockUnit = formState => (dispatch, getState) => {
  const panels = { ...getState().admin.panels };
  panels.unit = 'open';

  const editingArtistState = getState().admin.editingArtist;
  const editingArtist = {
    genre: formState.values.genre,
    name: formState.values.name,
    otherNames: formState.values.otherNames || '',
    private: formState.values.private || false,
    new: editingArtistState.new || false,
    state: 'edit',
  };

  dispatch(actions.setEditingArtist(editingArtist));
  dispatch(actions.setPanels(panels));
};

const unlockMembers = e => dispatch => {
  console.log(e);
};

export default {
  handleEditArtist,
  handleEditUnit,
  loadArtists,
  loadColors,
  loadMembers,
  switchUIReferenceTab,
  updateManageForm,
  unlockUnit,
  unlockMembers,
};
