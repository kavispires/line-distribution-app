import actions from './actions';

const login = () => dispatch => dispatch({ type: 'RUN_LOGIN' });

const logout = () => dispatch => dispatch({ type: 'RUN_LOGOUT' });

const updateFavoriteArtists = id => async (dispatch, getState) => {
  const user = { ...getState().auth.user };
  const userFavoriteArtists = { ...user.favoriteArtists } || {};
  if (user.id) {
    if (userFavoriteArtists[id]) {
      userFavoriteArtists[id] = false;
    } else {
      userFavoriteArtists[id] = true;
    }

    await dispatch({
      type: 'UPDATE_USER_FAVORITE_ARTISTS',
      userFavoriteArtists,
      userId: user.id,
    });

    user.favoriteArtists = userFavoriteArtists;
    dispatch(actions.setUser(user));
  }
};

const updateFavoriteMembers = id => async (dispatch, getState) => {
  const user = { ...getState().auth.user };
  const userFavoriteMembers = { ...user.favoriteMembers } || {};
  if (user.id) {
    if (userFavoriteMembers[id]) {
      userFavoriteMembers[id] = false;
    } else {
      userFavoriteMembers[id] = true;
    }

    await dispatch({
      type: 'UPDATE_USER_FAVORITE_MEMBERS',
      userFavoriteMembers,
      userId: user.id,
    });

    user.favoriteMembers = userFavoriteMembers;
    dispatch(actions.setUser(user));
  }
};

const updateBias = event => async (dispatch, getState) => {
  const { value } = event.target;
  const { id, members } = getState().artists.selectedUnit;

  if (value && id && members && members[value]) {
    const user = { ...getState().auth.user };
    const biases = { ...user.biases } || {};

    const biasId = `${id}:${value}`;

    // Stop if member is already the bias
    if (biases[biasId]) return;

    // Remove any biases within this unit
    Object.keys(members).forEach(key => {
      const currentBias = `${id}:${key}`;
      if (biases[currentBias]) {
        delete biases[`${id}:${key}`];
      }
    });

    biases[biasId] = true;

    const bias = { ...members[value] };

    await dispatch({
      type: 'UPDATE_USER_BIASES',
      bias,
      biases,
      userId: user.id,
    });
  }
};

export default {
  login,
  logout,
  updateBias,
  updateFavoriteArtists,
  updateFavoriteMembers,
};
