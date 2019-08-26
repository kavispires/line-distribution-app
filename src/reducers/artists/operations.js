import actions from './actions';

const loadArtist = (artistId, queryParams) => dispatch =>
  dispatch({ type: 'REQUEST_ARTIST', artistId, queryParams });

const loadUnit = (unitId, queryParams) => dispatch =>
  dispatch({ type: 'REQUEST_UNIT', unitId, queryParams });

const loadUserArtists = () => async (dispatch, getState) => {};

const updateLatestUnits = id => async (dispatch, getState) => {};

const getBias = () => (dispatch, getState) => {
  const { biases } = getState().auth.user;
  const { selectedUnit } = getState().artists;
  const { id, members } = selectedUnit;
  let bias = null;
  if (id && Object.keys(members).length) {
    Object.keys(members).forEach(key => {
      if (biases[`${id}:${key}`]) {
        bias = { ...selectedUnit.members[key] };
      }
    });
  }

  if (bias) {
    dispatch(actions.setBias(bias));
  } else {
    dispatch(actions.setBias({}));
  }
};

export default {
  getBias,
  loadUserArtists,
  loadArtist,
  loadUnit,
  updateLatestUnits,
};
