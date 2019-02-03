import { toastr } from 'react-redux-toastr';

import API from '../../api';

import actions from './actions';

import { appOperations } from '../app';
import utils from '../../utils';

const login = () => async dispatch => {
  dispatch(actions.setLoading(true, 'login'));

  let loggedUser = null;
  try {
    loggedUser = await API.login();
    loggedUser = loggedUser.data.attributes ? loggedUser.data : null;
  } catch (error) {
    console.error(error);
    toastr.error('Oh no!', error.toString());
  }

  if (loggedUser) {
    const user = utils.parseResponse(loggedUser);
    dispatch(actions.setUser(user));
    dispatch(actions.setAuthenticated(true));

    toastr.success('Hello!', `You are logged in as ${user.displayName}`);

    if (user.isAdmin) {
      dispatch(actions.setAdmin(true));
    }
  }

  dispatch(appOperations.setLoading(false, 'login'));
};

const logout = () => async dispatch => {
  dispatch(appOperations.setLoading(true, 'logoff'));

  try {
    await API.logoff();
    dispatch(actions.setAuthenticated(false));
    dispatch(actions.setAdmin(false));
    dispatch(actions.setUser({}));
    toastr.warning('', 'You are logged out');
  } catch (error) {
    console.error(error);
    toastr.error('Oh no', error.errorMessage);
  } finally {
    dispatch(appOperations.setLoading(false, 'logoff'));
  }
};

const updateFavoriteArtists = id => async (dispatch, getState) => {
  const user = { ...getState().auth.user };
  const userFavoriteArtists = { ...user.favoriteArtists } || {};
  console.log(userFavoriteArtists);
  if (user.id) {
    if (userFavoriteArtists[id]) {
      userFavoriteArtists[id] = false;
    } else {
      userFavoriteArtists[id] = true;
    }
    console.log(userFavoriteArtists);
    try {
      const newUserFavoriteArtists = await API.put(
        `/users/${user.id}/favorite-artists`,
        userFavoriteArtists
      );
      user.favoriteArtists = newUserFavoriteArtists.data;

      dispatch(actions.setUser(user));
    } catch (error) {
      console.error(error);
      toastr.error('Oh no', error.errorMessage);
    }
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
