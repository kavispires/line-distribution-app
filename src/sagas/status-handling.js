import { call, put, takeEvery } from 'redux-saga/effects';
import { toastr } from 'react-redux-toastr';

import { types } from '../reducers';

// PENDING WORKERS
const localPendingCache = {};

/**
 * Removes action type from pendingCache and updates pending if pendingCache is empty
 * @param {string} actionType
 */
function* clearPending(actionType) {
  if (typeof actionType === 'object') {
    actionType = actionType.actionType; // eslint-disable-line
  }
  if (localPendingCache[actionType]) {
    delete localPendingCache[actionType];
  }

  if (Object.keys(localPendingCache).length === 0) {
    yield put({ type: types.SET_PENDING, payload: localPendingCache });
  }
}

/**
 * Adds action type to pendingInlineCache and updates pending based on pendingInlineCache values
 * @param {string} actionType
 */
function* pending({ actionType }) {
  if (localPendingCache[actionType] === undefined) {
    localPendingCache[actionType] = true;
  }

  if (Object.keys(localPendingCache).length > 0) {
    yield put({ type: types.SET_PENDING, payload: localPendingCache });
  } else {
    yield put({ type: types.SET_PENDING, payload: localPendingCache });
  }
}

// ERROR WORKERS

/**
 * Dispatches an error message and an error flag, then clears pending status
 * @param {object|string} err
 * @param {string} actionType
 */
function* error({ message, actionType }) {
  const errorMessage = typeof err === 'string' ? message : message.join(': ');
  yield put({ type: types.SET_ERROR_MESSAGE, payload: errorMessage });
  yield put({ type: types.SET_ERROR, payload: true });
  console.error(errorMessage); // eslint-disable-line
  yield toastr.error(errorMessage);
  yield call(clearPending, actionType);
}

/**
 * Dispatches an error message and and an inline error flag, then clears pending status
 * @param {object|string} err
 * @param {string} actionType
 */
function* errorInline({ err, actionType }) {
  const errorMessage = typeof err === 'string' ? err : err.toString();
  yield put({ type: types.SET_ERROR_MESSAGE, payload: errorMessage });
  yield put({ type: types.SET_ERROR_INLINE, payload: true });
  console.error(errorMessage); // eslint-disable-line
  yield call(clearPending, actionType);
}

/**
 * Pops an error toast and cancel pending status
 * @param {array|string} message
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
 * Dispatches a success message and and an inline sucess flag, then clears pending status
 * @param {object|string} err
 * @param {string} actionType
 */
function* successInline({ err, actionType }) {
  const errorMessage = typeof err === 'string' ? err : err.toString();
  yield put({ type: types.SET_SUCCESS_MESSAGE, payload: errorMessage });
  yield put({ type: types.SET_SUCCESS_INLINE, payload: true });
  console.error(message.toString()); // eslint-disable-line
  yield call(clearPending, actionType);
}

/**
 * Pops a sucess toast and cancel pending status
 * @param {array|string} message
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
 * @param {array|string} message
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
  yield console.log('it calls test worker'); // eslint-disable-line
  yield console.log(action); // eslint-disable-line
}

function* statusHandlingSaga() {
  yield takeEvery('CLEAR_PENDING', clearPending);
  yield takeEvery('ERROR', error);
  yield takeEvery('ERROR_INLINE', errorInline);
  yield takeEvery('ERROR_TOAST', errorToast);
  yield takeEvery('PENDING', pending);
  yield takeEvery('SUCCESS_INLINE', successInline);
  yield takeEvery('SUCCESS_TOAST', successToast);
  yield takeEvery('WARNING_TOAST', warningToast);
  yield takeEvery('TEST', test);
}

export default statusHandlingSaga;
