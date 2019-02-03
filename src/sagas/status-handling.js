import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { toastr } from 'react-redux-toastr';

import { types } from '../reducers';

// Loading Bar Action Type Cache
const loadingCache = {};

// PENDING WORKERS

/**
 * Removes action type from loadingCache and updates pending if loadingCache is empty
 * @param {string} actionType
 */
function* clearPending(actionType) {
  if (loadingCache[actionType]) {
    delete loadingCache[actionType];
  }

  if (Object.keys(loadingCache).length === 0) {
    yield put({ type: types.SET_PENDING, payload: false });
  }
}

/**
 * Adds action type to loadingCache and updates pending based on loadingCache values
 * @param {string} actionType
 */
function* pending({ actionType }) {
  if (loadingCache[actionType] === undefined) {
    loadingCache[actionType] = true;
  }

  if (Object.keys(loadingCache).length > 0) {
    yield put({ type: types.SET_PENDING, payload: true });
  } else {
    yield put({ type: types.SET_PENDING, payload: false });
  }
}

// ERROR WORKERS

/**
 * Pops an error toast and cancel pending status
 * @param {array || string} message
 * @param {string} actionType
 */
function* errorToast({ message, actionType }) {
  if (Array.isArray(message)) {
    yield toastr.error(message[0] || '', message[1] || '');
  } else {
    yield toastr.error(message);
  }
  console.error(message.toString()); // eslint-disable-line
  yield call(clearPending, actionType);
}

// SUCCESS WORKERS

/**
 * Pops a sucess toast and cancel pending status
 * @param {array || string} message
 * @param {string} actionType
 */
function* successToast({ message, actionType }) {
  if (Array.isArray(message)) {
    yield toastr.success(message[0] || '', message[1] || '');
  } else {
    yield toastr.success(message);
  }
  yield call(clearPending, actionType);
}

// WARNING WORKERS

/**
 * Pops a warning toast and cancel pending status
 * @param {array || string} message
 * @param {string} actionType
 */
function* warningToast({ message, actionType }) {
  if (Array.isArray(message)) {
    yield toastr.warning(message[0] || '', message[1] || '');
  } else {
    yield toastr.warning(message);
  }
  yield call(clearPending, actionType);
}

// TO-DO: Remove this
function* test(action) {
  yield console.log('it calls test worker');
  yield console.log(action);
}

function* statusHandlingSaga() {
  yield takeLatest('CLEAR_PENDING', clearPending);
  yield takeEvery('ERROR', test);
  yield takeEvery('ERROR_TOAST', errorToast);
  yield takeEvery('PENDING', pending);
  yield takeEvery('SUCCESS', test);
  yield takeEvery('SUCCESS_TOAST', successToast);
  yield takeEvery('WARNING_TOAST', warningToast);
}

export default statusHandlingSaga;
