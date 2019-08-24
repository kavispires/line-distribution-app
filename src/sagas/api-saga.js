import { all, call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import _ from 'lodash';
import { toastr } from 'react-redux-toastr';

// import API from '../api';
import API from '../api2';

import { types } from '../reducers';
import utils from '../utils';
import constants from '../utils/constants';

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
    const response = yield API.init();

    if (response.loaded) {
      yield put({ type: types.SET_DATABASE_READY, payload: response.loaded });
    }

    if (response.user.data.id) {
      const user = utils.parseResponse(response.user);

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
    console.log(error);
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

    const parsedArtists = utils.parseResponse(response);
    yield put({ type: types.SET_ARTISTS, payload: parsedArtists });

    const { typeahead } = response.meta;
    yield put({ type: types.SET_ARTISTS_TYPEAHEAD, payload: typeahead });
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
    panels.artist = state;

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

    selectedArtist.genre = constants.GENRES_DB[selectedArtist.genre];

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

function* requestDistribution(action) {
  yield put({ type: 'PENDING', actionType: action.type });
  yield delay(DELAY_DURATION);

  const { distributionId } = action;

  let selectedDistribution = {};

  // Fetch Distribution
  try {
    const response = yield API.get(`/distributions/${distributionId}`);
    selectedDistribution = utils.parseResponse(response);
  } catch (error) {
    yield put({
      type: 'ERROR',
      message: [
        `Unable to load distribution ${distributionId} from database`,
        error.toString(),
      ],
      actionType: action.type,
    });
  }

  yield put({
    type: types.SET_ACTIVE_DISTRIBUTION,
    payload: selectedDistribution,
  });

  yield put({ type: 'CLEAR_PENDING', actionType: action.type });

  return selectedDistribution;
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

function* requestSong(action) {
  yield put({ type: 'PENDING', actionType: action.type });
  yield delay(DELAY_DURATION);

  const { songId, previouslyLoadedSongs } = action;

  let selectedSong = {};

  // Fetch Artist
  try {
    const response = yield API.get(`/songs/${songId}`);
    selectedSong = utils.parseResponse(response);

    // Activate Song
    yield put({ type: types.SET_ACTIVE_SONG, payload: selectedSong });

    // Add selected song to previously fetched songs
    const sortedSongsList = _.orderBy(
      [selectedSong, ...previouslyLoadedSongs],
      [s => s.title.toLowerCase()]
    );
    yield put({ type: types.SET_SONGS, payload: sortedSongsList });
  } catch (error) {
    yield put({
      type: 'ERROR',
      message: [
        `Unable to load song ${songId} from database`,
        error.toString(),
      ],
      actionType: action.type,
    });
  }

  yield put({ type: 'CLEAR_PENDING', actionType: action.type });
}

function* requestSongs(action) {
  yield put({ type: 'PENDING', actionType: action.type });
  yield delay(DELAY_DURATION);

  try {
    const response = yield API.get('/songs');
    const songsList = utils.parseResponse(response);
    const sortedSongsList = _.orderBy(songsList, [s => s.title.toLowerCase()]);
    yield put({ type: types.SET_SONGS, payload: sortedSongsList });
  } catch (error) {
    yield put({
      type: 'ERROR',
      message: ['Unable to load songs database', error.toString()],
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

  const membersArray = Object.values(members);

  unit.gender = membersArray.reduce((res, member) => {
    if (member.gender !== res) return 'MIXED';
    return res;
  }, membersArray[0].gender);

  // Fetch distributions and merge
  let distributions = [];
  try {
    const response = yield API.get(`/units/${unitId}/distributions`);
    distributions = utils.parseResponse(response);
  } catch (error) {
    yield put({
      type: 'ERROR',
      message: [
        `Unable to load distributions from unit ${unitId} from database`,
        error.toString(),
      ],
      actionType,
    });
  }

  const songsDict = {};

  // Separate distribution into official and custom ones
  unit.distributions = distributions.reduce(
    (obj, distribution) => {
      if (
        distribution.category === 'OFFICIAL' ||
        distribution.category === ''
      ) {
        // TO-DO: Remove this when DB is fixed
        distribution.category = 'OFFICIAL';
        obj.official.push(distribution);
      } else {
        obj.custom.push(distribution);
      }

      // Set songs dictionary entry
      songsDict[distribution.songId] = distribution.id;

      return obj;
    },
    {
      official: [],
      custom: [],
    }
  );

  // Sort songs
  unit.distributions.official = _.sortBy(unit.distributions.official, [
    'title',
    'originalArtist',
  ]);
  unit.distributions.custom = _.sortBy(unit.distributions.custom, [
    'title',
    'originalArtist',
  ]);

  // Add songs dictionary to unit
  unit.songsDict = songsDict;

  // Calculate averages
  const averages = {};
  const totals = {
    official: 0,
    custom: 0,
  };

  unit.distributions.official.forEach(distribution => {
    Object.entries(distribution.rates).forEach(([memberId, duration]) => {
      if (!['ALL', 'NONE', 'max', 'remaining', 'total'].includes(memberId)) {
        if (averages[memberId] === undefined) {
          averages[memberId] = {
            official: 0,
            custom: 0,
          };
        }
        averages[memberId].official += duration;
        totals.official += duration;
      }
    });
  });

  unit.distributions.custom.forEach(distribution => {
    Object.entries(distribution.rates).forEach(([memberId, duration]) => {
      if (!['ALL', 'NONE', 'max', 'remaining', 'total'].includes(memberId)) {
        if (averages[memberId] === undefined) {
          averages[memberId] = {
            official: 0,
            custom: 0,
          };
        }
        averages[memberId].custom += duration;
        totals.custom += duration;
      }
    });
  });

  Object.entries(averages).forEach(([memberId, durations]) => {
    averages[memberId].all = Number(
      (
        ((durations.official + durations.custom) * 100) /
        (totals.official + totals.custom)
      ).toFixed(1)
    );
    averages[memberId].official = Number(
      ((durations.official * 100) / totals.official).toFixed(1)
    );
    averages[memberId].custom = Number(
      ((durations.custom * 100) / totals.custom).toFixed(1)
    );

    averages[memberId].official =
      averages[memberId].official > 1 ? averages[memberId].official : 0;
    averages[memberId].custom =
      averages[memberId].custom > 1 ? averages[memberId].custom : 0;
  });

  unit.averages = averages;

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

  // Make colors in use dict
  const colorsInUse = {};
  members.forEach(member => (colorsInUse[member.colorId] = true)); //eslint-disable-line

  yield put({ type: types.SET_COLORS_IN_USE, payload: colorsInUse });
  yield put({ type: types.SET_EDITING_MEMBERS, payload: members });
  yield put({ type: types.SET_PANELS, payload: panels });

  yield put({ type: 'CLEAR_PENDING', actionType: type });
  return members;
}

function* resyncDatabase(action) {
  yield put({ type: 'PENDING', actionType: action.type });
  yield delay(DELAY_DURATION);

  try {
    yield API.resyncDatabase();
  } catch (error) {
    yield put({
      type: 'ERROR',
      message: [`Unable to resync database`, error.toString()],
      actionType: action.type,
    });
  }

  // When done, re-request artists, colors, and members
  yield put({ type: 'REQUEST_ARTISTS' });
  yield put({ type: 'REQUEST_COLORS' });
  yield put({ type: 'REQUEST_MEMBERS' });

  yield put({ type: 'CLEAR_PENDING', actionType: action.type });
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

function* sendDistribution(action) {
  yield put({ type: 'PENDING', actionType: action.type });
  yield delay(DELAY_DURATION);

  let receivedSong;
  if (action.body.distributionId) {
    // Update song
    try {
      receivedSong = yield API.pyt(
        `/distributions/${action.body.distributionId}`,
        action.body
      );
    } catch (error) {
      yield put({
        type: 'ERROR_TOAST',
        message: `Failed updating distribution ${
          action.body.distributionId
        }: ${error.toString()}`,
        actionType: action.type,
      });
    }
  } else {
    // Save song
    try {
      receivedSong = yield API.post('/distributions', action.body);
    } catch (error) {
      yield put({
        type: 'ERROR_TOAST',
        message: `Failed writing distribution: ${error.toString()}`,
        actionType: action.type,
      });
    }
  }

  yield delay(DELAY_DURATION);

  yield put({ type: 'CLEAR_PENDING', actionType: action.type });
  return receivedSong;
}

function* sendLog(action) {
  yield put({ type: 'PENDING', actionType: action.type });
  yield delay(DELAY_DURATION);

  const logType = action.body.type === 'error' ? 'errors' : 'general';

  // Save song
  try {
    yield API.post(`/log/${logType}`, action.body);
  } catch (e) {
    // do nothing
  }

  yield delay(DELAY_DURATION);

  yield put({ type: 'CLEAR_PENDING', actionType: action.type });
}

function* sendSong(action) {
  yield put({ type: 'PENDING', actionType: action.type });
  yield delay(DELAY_DURATION);

  // Save song
  let receivedSong;
  try {
    receivedSong = yield API.post('/songs', action.body);
  } catch (error) {
    yield put({
      type: 'ERROR_TOAST',
      message: `Failed writing song: ${error.toString()}`,
      actionType: action.type,
    });
  }

  yield delay(DELAY_DURATION);

  yield put({ type: 'CLEAR_PENDING', actionType: action.type });
  return receivedSong;
}

function* updateCompleteArtist(action) {
  yield put({ type: 'PENDING', actionType: action.type });
  yield delay(DELAY_DURATION);

  const { artist, members, unit } = action;

  // Save Members
  const receivedMembers = yield all(
    members.map((member, index) =>
      call(updateMember, {
        type: `UPDATE_MEMBER_${index}`,
        member,
        referenceArtist: artist.name,
        artistGenre: artist.genre,
      })
    )
  );

  // Prepare Unit Members Data
  let unitMembers = {};
  receivedMembers.forEach(member => {
    unitMembers = {
      ...unitMembers,
      ...member.positions,
    };
  });

  yield delay(DELAY_DURATION);

  // Save Artist
  let receivedArtist;
  try {
    if (artist.id) {
      // Update member if it has an id
      receivedArtist = yield API.put(`/artists/${artist.id}`, artist);
    } else {
      // Create member if it does not have an id
      receivedArtist = yield API.post('/artists', artist);
    }
  } catch (error) {
    yield put({
      type: 'ERROR_TOAST',
      message: `Failed writing artist ${
        artist.id ? artist.id : artist.name
      } ${error.toString()}`,
      actionType: action.type,
    });
  }

  yield delay(DELAY_DURATION);

  // Save unit
  unit.members = unitMembers;
  unit.artistId = receivedArtist.data.id;
  let receivedUnit;

  try {
    if (unit.id) {
      // Update member if it has an id
      receivedUnit = yield API.put(`/units/${unit.id}`, unit);
    } else {
      // Create member if it does not have an id
      receivedUnit = yield API.post('/units', unit);
    }
  } catch (error) {
    yield put({
      type: 'ERROR_TOAST',
      message: `Failed writing unit ${
        unit.id ? unit.id : artist.name
      } ${error.toString()}`,
      actionType: action.type,
    });
  }

  yield delay(DELAY_DURATION);

  yield put({ type: 'SET_MANAGE_RESULT', payload: 'SUCCESS' });

  toastr.success('Complete Artist saved successfully');

  yield put({ type: 'CLEAR_PENDING', actionType: action.type });
  return receivedUnit;
}

function* updateMember(action) {
  yield put({ type: 'PENDING', actionType: action.type });
  yield delay(DELAY_DURATION);

  const { member, referenceArtist, artistGenre } = action;

  let response;
  try {
    if (member.id) {
      // Update member if it has an id
      response = yield API.put(`/members/${member.id}`, member);
    } else {
      // Create member if it does not have an id
      response = yield API.post('/members', {
        ...member,
        referenceArtist,
        primaryGenre: artistGenre,
      });
    }
  } catch (error) {
    yield put({
      type: 'ERROR_TOAST',
      message: `Failed writing member ${
        member.id ? member.id : member.name
      } ${error.toString()}`,
      actionType: action.type,
    });
  }

  response.data.positions = {};
  member.positions.forEach(pos => {
    response.data.positions[`${response.data.id}:${member.name}:${pos}`] = true;
  });

  yield put({ type: 'CLEAR_PENDING', actionType: action.type });
  return response.data;
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
  yield takeLatest('REQUEST_DISTRIBUTION', requestDistribution);
  yield takeLatest('REQUEST_MEMBERS', requestMembers);
  yield takeLatest('REQUEST_SONG', requestSong);
  yield takeLatest('REQUEST_SONGS', requestSongs);
  yield takeLatest('REQUEST_UNIT', requestUnit);
  yield takeLatest('REQUEST_UNIT_MEMBERS', requestUnitMembers);
  yield takeLatest('RESYNC_DATABASE', resyncDatabase);
  yield takeLatest('RUN_LOGIN', runLogin);
  yield takeLatest('RUN_LOGOUT', runLogout);
  yield takeLatest('SEND_DISTRIBUTION', sendDistribution);
  yield takeLatest('SEND_LOG', sendLog);
  yield takeLatest('SEND_SONG', sendSong);
  yield takeLatest('UPDATE_COMPLETE_ARTIST', updateCompleteArtist);
  yield takeLatest('UPDATE_USER_BIASES', updateUserBiases);
  yield takeLatest('UPDATE_USER_FAVORITE_ARTISTS', updateUserFavoriteArtists);
  yield takeLatest('UPDATE_USER_FAVORITE_MEMBERS', updateUserFavoriteMembers);

  yield takeEvery('TEST', test);
}

export default apiSaga;
