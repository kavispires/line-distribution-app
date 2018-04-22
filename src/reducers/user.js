
import firebase from 'firebase';
import { base, googleProvider } from '../firebase';

/* ------------------   ACTIONS   ------------------ */

const SET_ADMIN = 'SET_ADMIN';
const SET_AUTHENTICATED = 'SET_AUTHENTICATED';
const SET_USER = 'SET_USER';

/* --------------   ACTION CREATORS   -------------- */

export const setAdmin = payload => dispatch => dispatch({ type: SET_ADMIN, payload });
export const setAuthenticated = payload => dispatch => dispatch({ type: SET_AUTHENTICATED, payload });
export const setUser = payload => dispatch => dispatch({ type: SET_USER, payload });

/* -----------------   REDUCERS   ------------------ */

const initialState = {
  authenticated: false,
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
      newState.authenticated = action.payload;
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

export const selectAction = event => (dispatch) => {
  const { value } = event.target;

  if (value === 'reassign-songs-member-ids') {
    dispatch(setUser());
  }
};

export const login = () => async (dispatch) => {
  base.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    .then(() => base.auth().signInWithPopup(googleProvider)
      .then((result) => {
        // The signed-in user info.
        const { user } = result;
        // const token = result.credential.accessToken;

        if (user.emailVerified) {
          dispatch(setUser(user));
          dispatch(setAuthenticated(true));
          if (user.email === 'kavispires@gmail.com') {
            dispatch(setAdmin(true));
          }
        }
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const { email } = error;
        // The firebase.auth.AuthCredential type that was used.
        const { credential } = error;
        console.error(errorCode, errorMessage, email, credential);
      }));
};

export const logout = () => (dispatch) => {
  base.auth().signOut().then(() => {
    dispatch(setUser({}));
    dispatch(setAuthenticated(false));
  }).catch((error) => {
    // An error happened.
    console.error(error);
  });
};

export const checkAuth = () => (dispatch) => {
  base.auth().onAuthStateChanged((user) => {
    if (user) {
      // User is signed in.
      // var displayName = user.displayName;
      // var email = user.email;
      // var emailVerified = user.emailVerified;
      // var photoURL = user.photoURL;
      // var isAnonymous = user.isAnonymous;
      // var uid = user.uid;
      // var providerData = user.providerData;

      dispatch(setUser(user));
      dispatch(setAuthenticated(true));
      if (user.email === 'kavispires@gmail.com') {
        dispatch(setAdmin(true));
      }
      console.log('user exists, yupi', user);
      // ...
    } else {
      // User is signed out.
      // ...
      dispatch(setUser({}));
    }
  });
};
