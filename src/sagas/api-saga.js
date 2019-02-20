import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import _ from 'lodash';

import API from '../api';

import { types } from '../reducers';
import utils from '../utils';

// Delay helper to make API look more realistic
const delay = ms => new Promise(res => setTimeout(res, ms));
const DELAY_DURATION = process.env.NODE_ENV === 'development' ? 500 : 0;

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
  yield put({ type: 'PENDING', actionType: action.type });
  yield delay(DELAY_DURATION);

  try {
    const response = yield API.get('/artists');
    const artistList = utils.parseResponse(response);
    const sortedArtistList = _.sortBy(artistList, [a => a.name.toLowerCase()]);
    yield put({ type: types.SET_ARTISTS, payload: sortedArtistList });

    const artistsTypeahead = [];
    const artistsTypeaheadDict = {};

    sortedArtistList.forEach(artist => {
      artistsTypeahead.push(artist.name);
      artistsTypeaheadDict[artist.name] = artist.id;
    });
    yield put({ type: types.SET_ARTISTS_TYPEAHEAD, payload: artistsTypeahead });
    yield put({
      type: types.SET_ARTISTS_TYPEAHEAD_DICT,
      payload: artistsTypeaheadDict,
    });
  } catch (error) {
    yield put({
      type: 'ERROR',
      message: ['Unable to load artists database', error.toString()],
      actionType: action.type,
    });
  }

  yield put({ type: 'CLEAR_PENDING', actionType: action.type });
}

function* requestArtist(action) {
  yield put({ type: 'PENDING', actionType: action.type });
  yield delay(DELAY_DURATION);

  const { artistId, panels, state } = action;
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

  // Just send artist if dealing with Manage Artist
  if (state === 'edit') {
    selectedArtist.state = 'edit';

    const unitsTypeahead = [];
    const unitsTypeaheadDict = {};

    selectedArtist.units.forEach(unit => {
      unitsTypeahead.push(unit.name);
      unitsTypeaheadDict[unit.name] = unit.id;
    });
    yield put({ type: types.SET_UNITS_TYPEAHEAD, payload: unitsTypeahead });
    yield put({
      type: types.SET_UNITS_TYPEAHEAD_DICT,
      payload: unitsTypeaheadDict,
    });

    yield put({ type: types.SET_EDITING_ARTIST, payload: selectedArtist });
    yield put({ type: types.SET_PANELS, payload: panels });
  } else {
    // Fetch complete unit for default unit
    const selectedUnit = yield call(requestUnit, {
      unitId: selectedUnitId,
    });

    selectedArtist.units[unitIndex] = selectedUnit;

    yield put({ type: types.SET_ARTIST_PAGE_TAB, payload: selectedUnitId });
    yield put({ type: types.SET_SELECTED_ARTIST, payload: selectedArtist });
    yield put({ type: types.SET_SELECTED_UNIT, payload: selectedUnit });
  }

  yield put({ type: 'CLEAR_PENDING', actionType: action.type });
}

function* requestColors(action) {
  yield put({ type: 'PENDING', actionType: action.type });
  yield delay(DELAY_DURATION);

  try {
    const response = yield API.get('/colors');
    const colorsList = utils.parseResponseToObject(response);
    yield put({ type: types.SET_COLORS, payload: colorsList });
  } catch (error) {
    yield put({
      type: 'ERROR',
      message: ['Unable to load colors database', error.toString()],
      actionType: action.type,
    });
  }

  yield put({ type: 'CLEAR_PENDING', actionType: action.type });
}

function* requestMembers(action) {
  yield put({ type: 'PENDING', actionType: action.type });
  yield delay(DELAY_DURATION);

  try {
    const response = yield API.get('/members');
    const membersList = utils.parseResponse(response);
    const sortedMembersList = _.sortBy(membersList, [
      m => m.name.toLowerCase(),
    ]);
    yield put({ type: types.SET_MEMBERS, payload: sortedMembersList });

    const membersTypeahead = [];
    const membersTypeaheadDict = {};

    sortedMembersList.forEach(member => {
      const key = `${member.name} (${member.referenceArtist})`;
      membersTypeahead.push(key);
      membersTypeaheadDict[key] = member.id;
    });
    yield put({ type: types.SET_MEMBERS_TYPEAHEAD, payload: membersTypeahead });
    yield put({
      type: types.SET_MEMBERS_TYPEAHEAD_DICT,
      payload: membersTypeaheadDict,
    });
  } catch (error) {
    yield put({
      type: 'ERROR',
      message: ['Unable to load members database', error.toString()],
      actionType: action.type,
    });
  }

  yield put({ type: 'CLEAR_PENDING', actionType: action.type });
}

function* requestUnit({ type, unitId, selectedArtist, unitIndex }) {
  const actionType = 'REQUEST_UNIT';
  yield put({ type: 'PENDING', actionType });
  yield delay(DELAY_DURATION);

  let unit = {};
  try {
    const response = yield API.get(`/units/${unitId}`);
    unit = utils.parseResponse(response);
  } catch (error) {
    yield put({
      type: 'ERROR',
      message: [
        `Unable to load unit ${unitId} from database`,
        error.toString(),
      ],
      actionType,
    });
  }

  // Fetch members
  let members = {};
  try {
    const response = yield API.get(`/units/${unitId}/members`);
    members = utils.parseArrayToObject(response);
  } catch (error) {
    yield put({
      type: 'ERROR',
      message: [
        `Unable to load members from unit ${unitId} from database`,
        error.toString(),
      ],
      actionType,
    });
  }
  unit.members = members;

  // Fetch distributions and merge

  // Fetch legacy distributions and merge

  // Calculate averages

  // Flag unit as complete
  unit.complete = true;

  // The following if statements are used when the unit tab is updated in the UI
  if (type) {
    yield put({ type: types.SET_SELECTED_UNIT, payload: unit });
  }
  if (selectedArtist) {
    selectedArtist.units[unitIndex] = unit;
    yield put({ type: types.SET_SELECTED_ARTIST, payload: selectedArtist });
  }

  yield put({ type: 'CLEAR_PENDING', actionType });
  return unit;
}

function* requestUnitMembers({ type, unitId, panels }) {
  yield put({ type: 'PENDING', actionType: type });
  yield delay(DELAY_DURATION);

  let members = [];
  if (unitId) {
    try {
      const response = yield API.get(`/units/${unitId}/members`);
      members = response.data;
    } catch (error) {
      yield put({
        type: 'ERROR',
        message: [
          `Unable to load members from unit ${unitId} from database`,
          error.toString(),
        ],
        actionType: type,
      });
    }
  }

  yield put({ type: types.SET_EDITING_MEMBERS, payload: members });
  yield put({ type: types.SET_PANELS, payload: panels });

  yield put({ type: 'CLEAR_PENDING', actionType: type });
  return members;
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

function* updateUserBiases(action) {
  yield put({ type: 'PENDING', actionType: action.type });
  yield delay(DELAY_DURATION);

  try {
    yield API.put(`/users/${action.userId}/biases`, action.biases);
    yield put({ type: types.SET_BIASES, payload: action.biases });
    yield put({ type: types.SET_BIAS, payload: action.bias });
  } catch (error) {
    yield put({
      type: 'ERROR_TOAST',
      message: error.toString(),
      actionType: action.type,
    });
  }
  yield put({ type: 'CLEAR_PENDING', actionType: action.type });
}

function* updateUserFavoriteArtists(action) {
  yield put({ type: 'PENDING', actionType: action.type });
  yield delay(DELAY_DURATION);

  try {
    yield API.put(
      `/users/${action.userId}/favorite-artists`,
      action.userFavoriteArtists
    );
  } catch (error) {
    yield put({
      type: 'ERROR_TOAST',
      message: error.toString(),
      actionType: action.type,
    });
  }
  yield put({ type: 'CLEAR_PENDING', actionType: action.type });
}

function* updateUserFavoriteMembers(action) {
  yield put({ type: 'PENDING', actionType: action.type });
  yield delay(DELAY_DURATION);

  try {
    yield API.put(
      `/users/${action.userId}/favorite-members`,
      action.userFavoriteMembers
    );
  } catch (error) {
    yield put({
      type: 'ERROR_TOAST',
      message: error.toString(),
      actionType: action.type,
    });
  }
  yield put({ type: 'CLEAR_PENDING', actionType: action.type });
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
  yield takeLatest('REQUEST_COLORS', requestColors);
  yield takeLatest('REQUEST_MEMBERS', requestMembers);
  yield takeLatest('REQUEST_UNIT', requestUnit);
  yield takeLatest('REQUEST_UNIT_MEMBERS', requestUnitMembers);
  yield takeLatest('RUN_LOGIN', runLogin);
  yield takeLatest('RUN_LOGOUT', runLogout);
  yield takeLatest('UPDATE_USER_BIASES', updateUserBiases);
  yield takeLatest('UPDATE_USER_FAVORITE_ARTISTS', updateUserFavoriteArtists);
  yield takeLatest('UPDATE_USER_FAVORITE_MEMBERS', updateUserFavoriteMembers);

  yield takeEvery('TEST', test);
}

export default apiSaga;
