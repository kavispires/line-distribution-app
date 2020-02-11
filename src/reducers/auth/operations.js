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
  }
};

const updateBias = (biasId, artistId) => async (dispatch, getState) => {
  const user = { ...getState().auth.user };
  const userBiases = { ...user.biases } || {};

  if (!biasId || !artistId || !user.id) return;

  if (userBiases[artistId] === biasId) {
    delete userBiases[artistId];
  } else {
    userBiases[artistId] = biasId;
  }

  await dispatch({
    type: 'UPDATE_USER_BIASES',
    biases: userBiases,
    userId: user.id,
  });
};

export default {
  login,
  logout,
  updateBias,
  updateFavoriteArtists,
  updateFavoriteMembers,
};
