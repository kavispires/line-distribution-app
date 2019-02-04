import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import _ from 'lodash';

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
  } catch (error) {
    yield put({
      type: 'ERROR',
      message: error,
      actionType: action.type,
    });
  }

  yield put({ type: 'CLEAR_PENDING', actionType: action.type });
}

function* requestArtists(action) {
  yield put({ type: 'PENDING_INLINE', actionType: action.type });
  yield delay(DELAY_DURATION);

  try {
    const response = yield API.get('/artists');
    const artistList = utils.parseResponse(response);

    const sortedArtistList = _.sortBy(artistList, [a => a.name.toLowerCase()]);
    yield put({ type: types.SET_ARTIST_LIST, payload: sortedArtistList });
  } catch (error) {
    yield put({
      type: 'ERROR',
      message: ['Unable to load artists database', error.toString()],
      actionType: action.type,
    });
  }

  // TO-DO: Load latest artists, and favorite units

  yield put({ type: 'CLEAR_PENDING_INLINE', actionType: action.type });
}

function* requestArtist(action) {
  yield put({ type: 'PENDING', actionType: action.type });
  yield delay(DELAY_DURATION);

  const { artistId } = action;
  let { queryParams } = action;

  let selectedArtist = {};

  // Fetch Artist
  try {
    const response = yield API.get(`/artists/${artistId}`);
    selectedArtist = utils.parseResponse(response);
  } catch (error) {
    yield put({
      type: 'ERROR',
      message: [
        `Unable to load artist ${artistId} from database`,
        error.toString(),
      ],
      actionType: action.type,
    });
  }

  // Select default unit id
  queryParams = utils.parseQueryParams(queryParams);
  let selectedUnitId = selectedArtist.units[0];
  let unitIndex = 0;
  if (
    queryParams &&
    queryParams.unit &&
    selectedArtist.units.includes(queryParams.unit)
  ) {
    selectedUnitId = queryParams.unit;
    unitIndex = selectedArtist.units.indexOf(selectedUnitId);
  }

  // Fetch Artist's Units
  try {
    const response = yield API.get(`/artists/${artistId}/units`);

    selectedArtist.units = utils.parseResponse(response);
  } catch (error) {
    yield put({
      type: 'ERROR',
      message: [
        `Unable to load artist ${artistId}'s units from database`,
        error.toString(),
      ],
      actionType: action.type,
    });
  }

  // Fetch complete unit for default unit
  // selectedArtist = yield call(requestUnit, [selectedUnitId, selectedArtist]);

  yield put({ type: types.SET_ARTIST_PAGE_TAB, payload: selectedUnitId });
  yield put({ type: types.SET_SELECTED_ARTIST, payload: selectedArtist });
  yield put({
    type: types.SET_SELECTED_UNIT,
    payload: selectedArtist.units[unitIndex],
  });

  yield put({ type: 'CLEAR_PENDING', actionType: action.type });
}

function* requestUnit(action) {
  yield console.log(action);
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
      message: 'You are logged out',
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
  yield console.log('it calls test worker'); // eslint-disable-line
  yield console.log(action); // eslint-disable-line
}

function* apiSaga() {
  yield takeLatest('INITIALIZER', initializer);
  yield takeLatest('REQUEST_ARTISTS', requestArtists);
  yield takeLatest('REQUEST_ARTIST', requestArtist);
  yield takeLatest('REQUEST_UNIT', requestUnit);
  yield takeLatest('RUN_LOGIN', runLogin);
  yield takeLatest('RUN_LOGOUT', runLogout);

  yield takeEvery('TEST', test);
}

export default apiSaga;
