import _ from 'lodash';

import { copyToClipboard, getLatestId, getAlternativeColor } from '../utils';
import API from '../api';

/* ------------------   ACTIONS   ------------------ */

const SET_TEMP_INPUT = 'SET_TEMP_INPUT';
const SET_LOADED_ARTIST = 'SET_LOADED_ARTIST';
const SET_NEW_ARTIST_NAME = 'SET_NEW_ARTIST_NAME';
const SET_NEW_ARTIST_OTHER_NAMES = 'SET_NEW_ARTIST_OTHER_NAMES';
const SET_NEW_ARTIST_GENRE = 'SET_NEW_ARTIST_GENRE';
const SET_NEW_ARTIST_UNITS = 'SET_NEW_ARTIST_UNITS';
const SET_LOADED_UNIT = 'SET_LOADED_UNIT';
const SET_NEW_UNIT_NAME = 'SET_NEW_UNIT_NAME';
const SET_NEW_UNIT_DEBUT_YEAR = 'SET_NEW_UNIT_DEBUT_YEAR';
const SET_NEW_UNIT_OFFICIAL = 'SET_NEW_UNIT_OFFICIAL';
const SET_NEW_UNIT_MEMBERS = 'SET_NEW_UNIT_MEMBERS';
const SET_LOADED_MEMBER = 'SET_LOADED_MEMBER';
const SET_NEW_MEMBERS = 'SET_NEW_MEMBERS';

/* --------------   ACTION CREATORS   -------------- */

const setTempInput = payload => dispatch => dispatch({ type: SET_TEMP_INPUT, payload });
const setLoadedArtist = payload => dispatch => dispatch({ type: SET_LOADED_ARTIST, payload });
const setNewArtistName = payload => dispatch => dispatch({ type: SET_NEW_ARTIST_NAME, payload });
const setNewArtistOtherNames = payload => dispatch => dispatch({ type: SET_NEW_ARTIST_OTHER_NAMES, payload });
const setNewArtistGenre = payload => dispatch => dispatch({ type: SET_NEW_ARTIST_GENRE, payload });
const setNewArtistUnits = payload => dispatch => dispatch({ type: SET_NEW_ARTIST_UNITS, payload });
const setLoadedUnit = payload => dispatch => dispatch({ type: SET_LOADED_UNIT, payload });
const setNewUnitName = payload => dispatch => dispatch({ type: SET_NEW_UNIT_NAME, payload });
const setNewUnitDebutYear = payload => dispatch => dispatch({ type: SET_NEW_UNIT_DEBUT_YEAR, payload });
const setNewUnitOfficial = payload => dispatch => dispatch({ type: SET_NEW_UNIT_OFFICIAL, payload });
const setNewUnitMembers = payload => dispatch => dispatch({ type: SET_NEW_UNIT_MEMBERS, payload });
const setLoadedMember = payload => dispatch => dispatch({ type: SET_LOADED_MEMBER, payload });
const setNewMembers = payload => dispatch => dispatch({ type: SET_NEW_MEMBERS, payload });

/* -----------------   REDUCERS   ------------------ */

const initialState = {
  tempInput: '',
  loadedArtist: 0,
  newArtistName: '',
  newArtistOtherNames: '',
  newArtistGenre: 'K-Pop',
  newArtistUnits: [],
  loadedUnit: 0,
  newUnitName: '',
  newUnitDebutYear: '',
  newUnitOfficial: false,
  newUnitMembers: [],
  loadedMember: 0,
  newMembers: {},
};

export default function reducer(prevState = initialState, action) {
  const newState = Object.assign({}, prevState);

  switch (action.type) {
    case SET_TEMP_INPUT:
      newState.tempInput = action.payload;
      break;

    case SET_LOADED_ARTIST:
      newState.loadedArtist = action.payload;
      break;

    case SET_NEW_ARTIST_NAME:
      newState.newArtistName = action.payload;
      break;

    case SET_NEW_ARTIST_OTHER_NAMES:
      newState.newArtistOtherNames = action.payload;
      break;

    case SET_NEW_ARTIST_GENRE:
      newState.newArtistGenre = action.payload;
      break;

    case SET_NEW_ARTIST_UNITS:
      newState.newArtistUnits = action.payload;
      break;

    case SET_LOADED_UNIT:
      newState.loadedUnit = action.payload;
      break;

    case SET_NEW_UNIT_NAME:
      newState.newUnitName = action.payload;
      break;

    case SET_NEW_UNIT_DEBUT_YEAR:
      newState.newUnitDebutYear = action.payload;
      break;

    case SET_NEW_UNIT_OFFICIAL:
      newState.newUnitOfficial = action.payload;
      break;

    case SET_NEW_UNIT_MEMBERS:
      newState.newUnitMembers = action.payload;
      break;

    case SET_LOADED_MEMBER:
      newState.loadedMember = action.payload;
      break;

    case SET_NEW_MEMBERS:
      newState.newMembers = action.payload;
      break;

    default:
      return prevState;
  }
  return newState;
}

/* ---------------   DISPATCHERS   ----------------- */

export const loadArtist = event => (dispatch) => {
  dispatch(setTempInput(''));
  const { value } = event.target;
  dispatch(setLoadedArtist(value));
  if (+value > 0) {
    const artist = API.get(`/artists/${value}`);
    dispatch(setNewArtistName(artist.name));
    dispatch(setNewArtistOtherNames(artist.otherNames));
    dispatch(setNewArtistGenre(artist.genre));
    dispatch(setNewArtistUnits(artist.units));
    dispatch(setNewUnitName(''));
    dispatch(setNewUnitDebutYear(''));
    dispatch(setNewUnitOfficial(false));
    dispatch(setNewUnitMembers([]));
  } else {
    dispatch(setNewArtistName(''));
    dispatch(setNewArtistOtherNames(''));
    dispatch(setNewArtistGenre('K-Pop'));
    dispatch(setNewArtistUnits([]));
  }
};

export const handleNewArtistName = event => (dispatch) => {
  // Empty clipboard input
  dispatch(setTempInput(''));
  const { value } = event.target;
  dispatch(setNewArtistName(value));
};

export const handleNewArtistOtherNames = event => (dispatch) => {
  // Empty clipboard input
  dispatch(setTempInput(''));
  const { value } = event.target;
  dispatch(setNewArtistOtherNames(value));
};

export const handleNewArtistGenre = event => (dispatch) => {
  // Empty clipboard input
  dispatch(setTempInput(''));
  const { value } = event.target;
  dispatch(setNewArtistGenre(value));
};

export const loadUnit = event => (dispatch) => {
  dispatch(setTempInput(''));
  const { value } = event.target;
  dispatch(setLoadedUnit(value));
  if (+value > 0) {
    const unit = API.get(`/units/${value}`);
    dispatch(setNewUnitName(unit.name));
    dispatch(setNewUnitDebutYear(unit.debutYear));
    dispatch(setNewUnitOfficial(unit.official));
    dispatch(setNewUnitMembers(unit.members));
  } else {
    dispatch(setNewUnitName(''));
    dispatch(setNewUnitDebutYear(''));
    dispatch(setNewUnitOfficial(false));
    dispatch(setNewUnitMembers([]));
  }
};

export const handleNewUnitName = event => (dispatch) => {
  // Empty clipboard input
  dispatch(setTempInput(''));
  const { value } = event.target;
  dispatch(setNewUnitName(value));
};

export const handleNewUnitDebutYear = event => (dispatch) => {
  // Empty clipboard input
  dispatch(setTempInput(''));
  const { value } = event.target;
  dispatch(setNewUnitDebutYear(value));
};

export const handleNewUnitOfficial = event => (dispatch) => {
  // Empty clipboard input
  dispatch(setTempInput(''));
  const value = event.target.checked;
  dispatch(setNewUnitOfficial(value));
};

export const loadMember = event => (dispatch, getState) => {
  dispatch(setTempInput(''));
  const { value } = event.target;

  if (+value > 0) {
    const newUnitMembers = [...getState().creator.newUnitMembers];
    newUnitMembers.push(value);
    dispatch(setNewUnitMembers(newUnitMembers));
  }
  dispatch(setLoadedMember(0));
};

export const unloadMember = (event, id) => (dispatch, getState) => {
  event.preventDefault();

  // Empty clipboard input
  dispatch(setTempInput(''));

  const newUnitMembers = [...getState().creator.newUnitMembers];
  const index = newUnitMembers.indexOf(id);
  if (index > -1) {
    newUnitMembers.splice(index, 1);
  }
  dispatch(setNewUnitMembers(newUnitMembers));
};

export const addNewMember = event => (dispatch, getState) => {
  event.preventDefault();

  // Empty clipboard input
  dispatch(setTempInput(''));

  const newMembers = Object.assign({}, getState().creator.newMembers);
  const newUnitMembers = Object.assign({}, getState().creator.newUnitMembers);

  // Prevent more than 25 members
  if ((Object.keys(newMembers).length + newUnitMembers.length) === 25) {
    alert('You can NOT have more than 25 members in the same unit');
    return;
  }

  const newId = Date.now();

  const blankMember = {
    id: newId,
    name: '',
    colorId: 0,
    altColorId: 0,
    birthdate: 0,
    positions: [],
  };

  newMembers[newId] = blankMember;

  dispatch(setNewMembers(newMembers));
};

export const removeNewMember = (event, id) => (dispatch, getState) => {
  event.preventDefault();

  // Empty clipboard input
  dispatch(setTempInput(''));

  const newMembers = Object.assign({}, getState().creator.newMembers);
  delete newMembers[id];
  dispatch(setNewMembers(newMembers));
};

export const updateNewMember = (event, id, field) => (dispatch, getState) => {
  // Empty clipboard input
  dispatch(setTempInput(''));

  const newMembers = Object.assign({}, getState().creator.newMembers);
  const { value } = event.target;

  if (field === 'name') {
    newMembers[id].name = value;
  } else if (field === 'birthdate') {
    newMembers[id].birthdate = value;
  } else if (field === 'color' && value) {
    newMembers[id].colorId = Number(value);
    newMembers[id].altColorId = getAlternativeColor(value);
  } else if (field === 'position' && value) {
    if (newMembers[id].positions.indexOf(value) === -1) {
      newMembers[id].positions.push(Number(value));
    }
  }

  dispatch(setNewMembers(newMembers));
};

export const removePosition = (event, id, field) => (dispatch, getState) => {
  event.preventDefault();

  // Empty clipboard input
  dispatch(setTempInput(''));

  const newMembers = Object.assign({}, getState().creator.newMembers);

  newMembers[id].positions = newMembers[id].positions.filter(pos => pos !== field);

  dispatch(setNewMembers(newMembers));
};

export const generateMembersJSON = (evt, skipClipboard = false) => (dispatch, getState) => {
  console.log('Generating Members JSON...');
  const newMembers = _.cloneDeep(getState().creator.newMembers);

  let id = getLatestId('members');

  const newJSON = {};

  // Loop through members, check fields and replace id
  Object.keys(newMembers).forEach((key) => {
    const currentMember = newMembers[key];
    // Replace id
    currentMember.id = id;
    if (!currentMember.name) {
      return alert('Member missing Name');
    }
    if (!currentMember.birthdate) {
      return alert('Member missing Birthdate');
    }
    if (!currentMember.colorId) {
      return alert('Member missing Color');
    }
    if (currentMember.positions.length === 0) {
      return alert('Member missing Position');
    }
    // Sort positions
    currentMember.positions = currentMember.positions.sort((a, b) => a - b);
    // Convert birth date
    currentMember.birthdate = +currentMember.birthdate.split('-').join('');
    newJSON[id] = currentMember;
    id += 1;
  });

  if (!skipClipboard) {
    const clipboard = JSON.stringify(newJSON, null, 2);
    dispatch(setTempInput(clipboard));
    copyToClipboard();
  }

  // Get Existing Members, Get newJson, add them together and order by birthdayDate
  const existingMembers = {};
  const existingMembersIds = getState().creator.newUnitMembers;
  const membersDatabase = getState().database.members;
  existingMembersIds.forEach((mId) => {
    const member = _.cloneDeep(membersDatabase[mId]);
    existingMembers[mId] = member;
  });
  const allMembers = Object.assign({}, newJSON, existingMembers);

  const ids = _.orderBy(allMembers, ['birthdate'], ['asc']).map(member => member.id);

  return { members: newJSON, ids };
};

export const generateUnitJSON = (membersIds, skipClipboard = false) => (dispatch, getState) => {
  console.log('Generating Unit JSON...');
  const bandId = +getState().creator.loadedArtist;
  const unitName = getState().creator.newUnitName;
  const debutYear = getState().creator.newUnitDebutYear;
  const official = getState().creator.newUnitOfficial || false;
  const id = getLatestId('units');

  // newUnitMembers: [],
  // loadedMember: 0,
  // newMembers: {},

  if (!Array.isArray(membersIds)) {
    membersIds = ['ADD-MEMBER-IDS'];
  }

  if (!unitName) {
    return alert('Missing Band Name');
  }

  const newJSON = {
    id,
    bandId,
    name: unitName,
    debutYear,
    official,
    members: membersIds,
    songs: [],
  };

  if (!skipClipboard) {
    const clipboard = JSON.stringify(newJSON, null, 2);
    dispatch(setTempInput(clipboard));
    copyToClipboard();
  }

  return { unit: newJSON, id };
};

export const generateArtistJSON = (unitId, skipClipboard = false) => (dispatch, getState) => {
  console.log('Generating Artist JSON...');
  const artistName = getState().creator.newArtistName;
  const otherNames = getState().creator.newArtistOtherNames;
  const genre = getState().creator.newArtistGenre;
  let units = [...getState().creator.newArtistUnits];
  const { loadedUnit } = getState().creator;
  const id = getLatestId('artists');

  if (typeof unitId === 'number' || typeof unitId === 'string') {
    unitId = [unitId];
  } else if (loadedUnit) {
    unitId = [loadedUnit];
  } else {
    unitId = [];
  }
  units = units.concat(unitId);

  if (!artistName) {
    return alert('Missing Artist Name');
  }

  const newJSON = {
    id,
    name: artistName,
    otherNames,
    genre,
    units,
  };

  if (!skipClipboard) {
    const clipboard = JSON.stringify(newJSON, null, 2);
    dispatch(setTempInput(clipboard));
    copyToClipboard();
  }

  return { artist: newJSON };
};

export const generateFullJSON = event => (dispatch) => {
  console.log('Generating Full JSON...');

  const members = dispatch(generateMembersJSON(event, true));
  const unit = dispatch(generateUnitJSON(members.ids, true));
  const artist = dispatch(generateArtistJSON(unit.id, true));
  const newJSON = {};

  newJSON.artist = artist.artist;
  newJSON.unit = unit.unit;
  newJSON.members = members.members;

  const clipboard = JSON.stringify(newJSON, null, 2);
  dispatch(setTempInput(clipboard));
  copyToClipboard();
};

