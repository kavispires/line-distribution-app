import firebase, { auth } from 'firebase';
import { toastr } from 'react-redux-toastr';
import { base, googleProvider } from '../firebase';
import { API } from './db';

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

export const selectAction = event => dispatch => {
  const { value } = event.target;

  if (value === 'reassign-songs-member-ids') {
    dispatch(setUser());
  }
};

export const login = () => async dispatch => {
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
    });
};

export const checkAuth = () => dispatch => {
  base.auth().onAuthStateChanged(user => {
    if (user) {
      dispatch(mergeUser(user));
      dispatch(setAuthenticated(true));
      toastr.info('Welcome back!', `You are logged in as ${user.displayName}`);
      if (user.email === 'kavispires@gmail.com') {
        dispatch(setAdmin(true));
      }
      // ...
    } else {
      // User is signed out.
      // ...
      dispatch(setUser({}));
      dispatch(setAuthenticated(false));
    }
  });
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

  dispatch(setUser(user));
};
