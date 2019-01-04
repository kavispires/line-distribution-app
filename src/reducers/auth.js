import { toastr } from 'react-redux-toastr';

import firebase from 'firebase';

import { base, googleProvider } from '../firebase';

import { setLoading } from './app';

import API from '../api';

/* ------------------   ACTIONS   ------------------ */

const SET_ADMIN = 'SET_ADMIN';
const SET_AUTHENTICATED = 'SET_AUTHENTICATED';
const SET_USER = 'SET_USER';

/* --------------   ACTION CREATORS   -------------- */

export const setAdmin = payload => dispatch =>
  dispatch({ type: SET_ADMIN, payload });
export const setAuthenticated = payload => dispatch =>
  dispatch({ type: SET_AUTHENTICATED, payload });
export const setUser = payload => dispatch =>
  dispatch({ type: SET_USER, payload });

/* -----------------   REDUCERS   ------------------ */

const initialState = {
  isAuthenticated: false,
  isAdmin: false,
  user: {},
};

export default function reducer(prevState = initialState, action) {
  const newState = Object.assign({}, prevState);

  switch (action.type) {
    case SET_ADMIN:
      newState.isAdmin = action.payload;
      break;

    case SET_AUTHENTICATED:
      newState.isAuthenticated = action.payload;
      break;

    case SET_USER:
      newState.user = action.payload;
      break;

    default:
      return prevState;
  }

  return newState;
}

/* ---------------   DISPATCHERS   ----------------- */

export const login = () => async (dispatch, getState) => {
  dispatch(setLoading(true, 'auth'));
  base
    .auth()
    .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    .then(() =>
      base
        .auth()
        .signInWithPopup(googleProvider)
        .then(result => {
          // The signed-in user info.
          const { user } = result;

          if (user.emailVerified) {
            dispatch(mergeUser(user));
            dispatch(setAuthenticated(true));
            toastr.success('', `You are logged in as ${user.displayName}`);
            if (user.email === 'kavispires@gmail.com') {
              dispatch(setAdmin(true));
            }
            if (getState().db.loaded) {
              dispatch(setLoading(false, 'auth'));
            }
          }
        })
        .catch(error => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const { email } = error;
          // The firebase.auth.AuthCredential type that was used.
          const { credential } = error;
          console.error(errorCode, errorMessage, email, credential);
          toastr.error('Oh no', errorMessage);
          if (getState().db.loaded) {
            dispatch(setLoading(false, 'auth'));
          }
        })
    );
};

export const logout = () => dispatch => {
  base
    .auth()
    .signOut()
    .then(() => {
      dispatch(setUser({}));
      dispatch(setAuthenticated(false));
      toastr.warning('', 'You are logged out');
    })
    .catch(error => {
      // An error happened.
      console.error(error);
      toastr.error('Oh no', error.errorMessage);
    });
};

// Verifies if the users is still logged from a previous session, since it depends
// on a firebase observer, we have to trigger it at least two seconds after the db is ready
export const checkAuth = () => async dispatch => {
  dispatch(setLoading(true, 'auth'));
  setTimeout(async () => {
    let loggedUser = null;
    try {
      loggedUser = await API.auth();
      loggedUser = loggedUser.data.attributes ? loggedUser.data : null;
    } catch (_) {
      // Do nothing if user has no session
    }

    if (loggedUser) {
      const user = loggedUser.attributes;
      user.id = loggedUser.id;
      dispatch(setUser(user));
      dispatch(setAuthenticated(true));
      toastr.success(
        'Welcome back!',
        `You are logged in as ${user.displayName}`
      );
    }

    dispatch(setLoading(false, 'auth'));
  }, 2000);
};

export const mergeUser = authUser => async (dispatch, getState) => {
  // Only if db is loaded
  if (!getState().db.loaded) return;

  let user;
  try {
    user = await API.get(`/users/${authUser.uid}`);
  } catch (e) {
    // If user doesn't existe, create one
    const body = {
      email: authUser.email,
      isAdmin: false,
    };
    user = await API.post(`/users/${authUser.uid}`, body);
  }

  if (user) {
    user.displayName = authUser.displayName;
    user.photoURL = authUser.photoURL;
    user.uid = authUser.uid;
  }

  const returnedUser = user.attributes;
  returnedUser.id = user.id;

  dispatch(setUser(returnedUser));
};

export const updateFavoriteArtists = id => async (dispatch, getState) => {
  const user = { ...getState().auth.user };
  const userFavoriteArtists = { ...user.favoriteArtists } || {};

  if (user.uid) {
    if (userFavoriteArtists[id]) {
      delete userFavoriteArtists[id];
    } else {
      userFavoriteArtists[id] = true;
    }

    const newUserFavoriteArtists = await API.post(
      `/users/${user.uid}/favorite-artists`,
      userFavoriteArtists
    );

    user.favoriteArtists = newUserFavoriteArtists;

    dispatch(setUser(user));
  }
};

export const updateFavoriteMembers = id => async (dispatch, getState) => {
  const user = { ...getState().auth.user };
  const userFavoriteMembers = { ...user.favoriteMembers } || {};

  if (user.uid) {
    if (userFavoriteMembers[id]) {
      delete userFavoriteMembers[id];
    } else {
      userFavoriteMembers[id] = true;
    }

    const newUserFavoriteArtists = await API.post(
      `/users/${user.uid}/favorite-members`,
      userFavoriteMembers
    );
    user.favoriteArtists = newUserFavoriteArtists;

    dispatch(setUser(user));
  }
};
