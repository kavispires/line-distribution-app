import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { toastr } from 'react-redux-toastr';

import API from '../api';

import { types } from '../reducers';
import utils from '../utils';

// Delay helper to make API look more realistic
const delay = ms => new Promise(res => setTimeout(res, ms));
const DELAY_DURATION = 2000;

// Loading Bar Saga Workers
const loadingCache = {};

/**
 * Toggle global loading bar based on action type
 * @param {string} type
 * @param {boolean} value
 */
function* setLoading(type, value) {
  if (typeof type !== 'string') {
    return console.error('Missing action type string');
  }
  if (typeof value !== 'boolean') {
    return console.error('Missing boolean value string');
  }

  // Check if instance is in the dictonary or not.
  if (loadingCache[type] === undefined && value) {
    loadingCache[type] = true;
    yield put({ type: 'SET_IS_LOADING', payload: true });
  } else if (loadingCache[type] && !value) {
    delete loadingCache[type];
  }
  // If there are no loading instances, remove loading bar
  if (Object.keys(loadingCache).length === 0) {
    yield put({ type: 'SET_IS_LOADING', payload: false });
  }
  return null;
}

// API Workers

/**
 * Initializes database, check for existing auth session, and load colors
 * @param {object} action
 */
function* initializer(action) {
  yield call(setLoading, action.type, true);
  yield delay(DELAY_DURATION);

  try {
    const dbStart = yield API.init();
    const status = dbStart.dbInfo();
    yield put({ type: types.SET_DATABASE_READY, payload: status.data.loaded });

    yield delay(DELAY_DURATION);

    let loggedUser = yield API.auth();
    loggedUser = loggedUser.data.attributes ? loggedUser.data : null;
    if (loggedUser) {
      const user = utils.parseResponse(loggedUser);

      yield put({ type: types.SET_USER, payload: user });
      yield put({ type: types.SET_AUTHENTICATED, payload: true });

      toastr.success(
        'Welcome back!',
        `You are logged in as ${user.displayName}`
      );

      if (user.isAdmin) {
        yield put({ type: types.SET_ADMIN, payload: true });
      }
    }

    // TO-DO: Resolve this when artist is selected
    let colors = yield API.get('/colors');
    colors = utils.parseResponseToObject(colors);
    yield put({ type: types.SET_COLORS, payload: colors });
  } catch (error) {
    // TO-DO: Create a proper error screen
    console.error(error);
    toastr.error('Unable to reach database', error);
  } finally {
    yield call(setLoading, action.type, false);
  }
}

// TO-DO: Remove this
function* test(action) {
  yield console.log('it call this function');
  yield console.log(action);
}

function* ldSaga() {
  yield takeLatest('INITIALIZER', initializer);
  yield takeEvery('RUN_LOGIN', test);
}

export default ldSaga;
