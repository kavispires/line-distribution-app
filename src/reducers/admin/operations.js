import actions from './actions';

const loadColors = () => dispatch => dispatch({ type: 'REQUEST_COLORS' });

const switchUIReferenceTab = event => async dispatch => {
  const { id } = event.target;

  if (!id) return null;

  return dispatch(actions.setUIReferenceTab(id));
};

export default {
  loadColors,
  switchUIReferenceTab,
};
