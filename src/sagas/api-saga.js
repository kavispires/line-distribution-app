import { put, takeEvery, takeLatest } from 'redux-saga/effects';

import API from '../api';

import { types } from '../reducers';
import utils from '../utils';

// Delay helper to make API look more realistic
const delay = ms => new Promise(res => setTimeout(res, ms));
const DELAY_DURATION = process.env.NODE_ENV === 'development' ? 1000 : 0;

// API Workers

/**
 * Initializes database, check for existing auth session, and load colors
 * @param {object} action
 */
function* initializer(action) {
  yield put({ type: 'PENDING', actionType: action.type });
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

      if (user.isAdmin) {
        yield put({ type: types.SET_ADMIN, payload: true });
      }

      yield put({
        type: 'SUCCESS_TOAST',
        message: ['Welcome back!', `You are logged in as ${user.displayName}`],
        actionType: action.type,
      });
    }

    // TO-DO: Resolve this when artist is selected
    let colors = yield API.get('/colors');
    colors = utils.parseResponseToObject(colors);
    yield put({ type: types.SET_COLORS, payload: colors });
  } catch (error) {
    // TO-DO: Create a proper error screen
    console.error(error);
    // toastr.error('Unable to reach database', error);
  }
}

function* runLogin(action) {
  yield put({ type: 'PENDING', actionType: action.type });

  try {
    let loggedUser = yield API.login();
    loggedUser = loggedUser.data.attributes ? loggedUser.data : null;

    if (loggedUser) {
      const user = utils.parseResponse(loggedUser);

      yield put({ type: types.SET_USER, payload: user });
      yield put({ type: types.SET_AUTHENTICATED, payload: true });

      if (user.isAdmin) {
        yield put({ type: types.SET_ADMIN, payload: true });
      }

      yield put({
        type: 'SUCCESS_TOAST',
        message: ['Hello!', `You are logged in as ${user.displayName}`],
        actionType: action.type,
      });
    }
  } catch (error) {
    yield put({
      type: 'ERROR_TOAST',
      message: error.toString(),
      actionType: action.type,
    });
  }
}

function* runLogout(action) {
  yield put({ type: 'PENDING', actionType: action.type });

  try {
    yield API.logoff();

    yield put({ type: types.SET_USER, payload: {} });
    yield put({ type: types.SET_AUTHENTICATED, payload: false });
    yield put({ type: types.SET_ADMIN, payload: false });

    yield put({
      type: 'WARNING_TOAST',
      message: ['', 'You are logged out'],
      actionType: action.type,
    });
  } catch (error) {
    yield put({
      type: 'ERROR_TOAST',
      message: error.toString(),
      actionType: action.type,
    });
  }
}

// TO-DO: Remove this
function* test(action) {
  yield console.log('it calls test worker');
  yield console.log(action);
}

function* apiSaga() {
  yield takeLatest('INITIALIZER', initializer);
  yield takeLatest('RUN_LOGIN', runLogin);
  yield takeLatest('RUN_LOGOUT', runLogout);
  yield takeEvery('TEST', test);
}

export default apiSaga;
