import { toastr } from 'react-redux-toastr';

import API from '../../api';

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

    try {
      const newUserFavoriteMembers = await API.put(
        `/users/${user.id}/favorite-members`,
        userFavoriteMembers
      );
      user.userFavoriteMembers = newUserFavoriteMembers.data;

      dispatch(actions.setUser(user));
    } catch (error) {
      console.error(error);
      toastr.error('Oh no', error.errorMessage);
    }
  }
};

export default {
  login,
  logout,
  updateFavoriteArtists,
  updateFavoriteMembers,
};
