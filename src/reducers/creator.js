import _ from 'lodash';
import { copyToClipboard, getLatestId, getAlternativeColor } from '../utils';

/* ------------------   ACTIONS   ------------------ */

const SET_BAND_NAME = 'SET_BAND_NAME';
const SET_OTHER_NAMES = 'SET_OTHER_NAMES';
const SET_VERSION = 'SET_VERSION';
const SET_GENRE = 'SET_GENRE';
const SET_OFFICIAL = 'SET_OFFICIAL';
const SET_TEMP_INPUT = 'SET_TEMP_INPUT';
const SET_MEMBER_COUNT = 'SET_MEMBER_COUNT';
const SET_NEW_MEMBERS = 'SET_NEW_MEMBERS';

/* --------------   ACTION CREATORS   -------------- */

const setBandName = payload => dispatch => dispatch({ type: SET_BAND_NAME, payload });
const setOtherNames = payload => dispatch => dispatch({ type: SET_OTHER_NAMES, payload });
const setVersion = payload => dispatch => dispatch({ type: SET_VERSION, payload });
const setGenre = payload => dispatch => dispatch({ type: SET_GENRE, payload });
const setMemberCount = payload => dispatch => dispatch({ type: SET_MEMBER_COUNT, payload });
const setOfficial = payload => dispatch => dispatch({ type: SET_OFFICIAL, payload });
const setTempInput = payload => dispatch => dispatch({ type: SET_TEMP_INPUT, payload });
const setNewMembers = payload => dispatch => dispatch({ type: SET_NEW_MEMBERS, payload });

/* -----------------   REDUCERS   ------------------ */

const initialState = {
  bandName: '',
  otherNames: '',
  version: '',
  genre: 'K-Pop',
  official: false,
  tempInput: '',
  memberCount: 0,
  newMembers: [],
};

export default function reducer(prevState = initialState, action) {

  const newState = Object.assign({}, prevState);

  switch (action.type) {

    case SET_BAND_NAME:
      newState.bandName = action.payload;
      break;

    case SET_OTHER_NAMES:
      newState.otherNames = action.payload;
      break;

    case SET_VERSION:
      newState.version = action.payload;
      break;

    case SET_GENRE:
      newState.genre = action.payload;
      break;

    case SET_MEMBER_COUNT:
      newState.memberCount = action.payload;
      break;

    case SET_OFFICIAL:
      newState.official = action.payload;
      break;

    case SET_TEMP_INPUT:
      newState.tempInput = action.payload;
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

export const handleBandName = (event) => (dispatch) => {
  // Empty clipboard input
  dispatch(setTempInput(''));
  const value = event.target.value;
  dispatch(setBandName(value));
};

export const handleOtherNames = (event) => (dispatch) => {
  // Empty clipboard input
  dispatch(setTempInput(''));
  const value = event.target.value;
  dispatch(setOtherNames(value));
};

export const handleVersion = (event) => (dispatch) => {
  // Empty clipboard input
  dispatch(setTempInput(''));
  const value = event.target.value;
  dispatch(setVersion(value));
};

export const handleGenre = (event) => (dispatch) => {
  // Empty clipboard input
  dispatch(setTempInput(''));
  const value = event.target.value;
  dispatch(setGenre(value));
};

export const handleOfficial = (event) => (dispatch) => {
  // Empty clipboard input
  dispatch(setTempInput(''));
  const value = event.target.checked;
  dispatch(setOfficial(value));
};

export const generateBandJSON = (membersIds, skipClipboard = false) => (dispatch, getState) => {
  console.log('Generating Band JSON...');
  const bandName = getState().creator.bandName;
  const otherNames = getState().creator.otherNames;
  const version = getState().creator.version || null;
  const genre = getState().creator.genre;
  const official = getState().creator.official || false;
  const id = getLatestId('artists');

  if (!Array.isArray(membersIds)) {
    membersIds = ['ADD-MEMBER-IDS'];
  }

  if (!bandName) {
    return alert('Missing Band Name');
  }

  const newJSON = {
    id: id,
    name: bandName,
    official: official,
    version: version,
    genre: genre,
    members: membersIds,
    songs: []
  };

  if (!skipClipboard) {
    const clipboard = JSON.stringify(newJSON, null, 2);
    dispatch(setTempInput(clipboard));
    copyToClipboard();
  }

  return {band: newJSON};
};

export const addBlankMember = (event) => (dispatch, getState) => {
  event.preventDefault();

  // Empty clipboard input
  dispatch(setTempInput(''));

  const newMembers = Object.assign({}, getState().creator.newMembers);

  // Prevent more than 25 members
  if (Object.keys(newMembers).length === 25) {
    alert('You can NOT have more than 25 members in the same band');
    return;
  }

  const newId = Date.now();

  const blankMember = {
    id: newId,
    name: '',
    colorId: 0,
    altColorId: 0,
    birthdate: 0,
    position: []
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
  const value = event.target.value;
  if (field === 'name') {
    newMembers[id].name = value;
  } else if (field === 'birthdate') {
    newMembers[id].birthdate = value;
  } else if (field === 'color' && value) {
    newMembers[id].colorId = Number(value);
    newMembers[id].altColorId = getAlternativeColor(value);
  }
  else if (field === 'position' && value) {
    if (newMembers[id].position.indexOf(value) === -1) {
      newMembers[id].position.push(Number(value));
    }
  }

  dispatch(setNewMembers(newMembers));
};

export const removePosition = (event, id, field) => (dispatch, getState) => {
  event.preventDefault();

  // Empty clipboard input
  dispatch(setTempInput(''));

  const newMembers = Object.assign({}, getState().creator.newMembers);

  newMembers[id].position = newMembers[id].position.filter(pos => pos !== field);

  dispatch(setNewMembers(newMembers));
}

export const generateMembersJSON = (evt, skipClipboard = false) => (dispatch, getState) => {
  console.log('Generating Members JSON...');
  const newMembers = _.cloneDeep(getState().creator.newMembers);

  let id = getLatestId('members');

  const newJSON = {};

  // Loop through members, check fields and replace id
  for (let key in newMembers) {
    if (newMembers.hasOwnProperty(key)) {
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
      if (currentMember.position.length === 0) {
        return alert('Member missing Position');
      }
      // Sort positions
      currentMember.position = currentMember.position.sort((a,b) => a - b);
      // Convert birth date
      currentMember.birthdate = currentMember.birthdate.split('-').join('');
      newJSON[id] = currentMember;
      id++;
    }
  }

  if (!skipClipboard) {
    const clipboard = JSON.stringify(newJSON, null, 2);
    dispatch(setTempInput(clipboard));
    copyToClipboard();
  }

  const ids = _.orderBy(newJSON, ['birthdate'], ['asc']).map(member => member.id);

  return {members: newJSON, ids};
};

export const generateFullJSON = (event) => (dispatch, getState) => {
  console.log('Generating Full JSON...');

  const members = dispatch(generateMembersJSON(event, true));
  const band = dispatch(generateBandJSON(members.ids, true));
  const newJSON = {};
  newJSON[band.band.id] = band.band;
  newJSON[members] = members.members;

  const clipboard = JSON.stringify(newJSON, null, 2);
  dispatch(setTempInput(clipboard));
  copyToClipboard();
};
