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

// Verifies if the users is still logged from a previous session, since it depends
// on a firebase observer, we have to trigger it at least two seconds after the db is ready
const checkAuth = () => async dispatch => {
  dispatch(appOperations.setLoading(true, 'auth'));
  setTimeout(async () => {
    let loggedUser = null;
    try {
      loggedUser = await API.auth();
      loggedUser = loggedUser.data.attributes ? loggedUser.data : null;
    } catch (_) {
      // Do nothing if user has no session
    }

    if (loggedUser) {
      const user = utils.parseResponse(loggedUser);

      dispatch(actions.setUser(user));
      dispatch(actions.setAuthenticated(true));

      toastr.success(
        'Welcome back!',
        `You are logged in as ${user.displayName}`
      );

      if (user.isAdmin) {
        dispatch(actions.setAdmin(true));
      }
    }

    dispatch(appOperations.setLoading(false, 'auth'));
  }, 3000);
};

const updateFavoriteArtists = id => async (dispatch, getState) => {
  const user = { ...getState().auth.user };
  const userFavoriteArtists = { ...user.favoriteArtists } || {};

  if (user.uid) {
    if (userFavoriteArtists[id]) {
      delete userFavoriteArtists[id];
    } else {
      userFavoriteArtists[id] = true;
    }

    try {
      const newUserFavoriteArtists = await API.post(
        `/users/${user.uid}/favorite-artists`,
        userFavoriteArtists
      );
      user.favoriteArtists = newUserFavoriteArtists;

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

  if (user.uid) {
    if (userFavoriteMembers[id]) {
      delete userFavoriteMembers[id];
    } else {
      userFavoriteMembers[id] = true;
    }

    try {
      const newUserFavoriteArtists = await API.post(
        `/users/${user.uid}/favorite-members`,
        userFavoriteMembers
      );
      user.favoriteArtists = newUserFavoriteArtists;

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
  checkAuth,
  updateFavoriteArtists,
  updateFavoriteMembers,
};
