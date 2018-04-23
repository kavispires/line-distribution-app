import _ from 'lodash';

import API from '../api';

import { makeSixDigit } from '../utils';

/* ------------------   ACTIONS   ------------------ */

const SET_COLOR_COUNT = 'SET_COLOR_COUNT';
const SET_COLOR_SHEET_TAB = 'SET_COLOR_SHEET_TAB';
const SET_CURRENT_ARTIST = 'SET_CURRENT_ARTIST';
const SET_CURRENT_SONG = 'SET_CURRENT_SONG';
const SET_CURRENT_UNIT = 'SET_CURRENT_UNIT';
const SET_LATEST_UNITS = 'SET_LATEST_UNITS';
const SET_MEMBERS_LIST = 'SET_MEMBERS_LIST';

const SET_SHOULD_RESET = 'SET_SHOULD_RESET';

const SET_IS_LOADING = 'SET_IS_LOADING';

/* --------------   ACTION CREATORS   -------------- */


export const setColorCount = payload => dispatch => dispatch({ type: SET_COLOR_COUNT, payload });
export const setColorSheetTab = payload => dispatch => dispatch({ type: SET_COLOR_SHEET_TAB, payload });
export const setCurrentArtist = payload => dispatch => dispatch({ type: SET_CURRENT_ARTIST, payload });
export const setCurrentSong = payload => dispatch => dispatch({ type: SET_CURRENT_SONG, payload });
export const setCurrentUnit = payload => dispatch => dispatch({ type: SET_CURRENT_UNIT, payload });

export const setLatestUnits = payload => dispatch => dispatch({ type: SET_LATEST_UNITS, payload });
export const setMembersList = payload => dispatch => dispatch({ type: SET_MEMBERS_LIST, payload });

export const setShouldReset = payload => dispatch => dispatch({ type: SET_SHOULD_RESET, payload });
export const setIsLoading = payload => dispatch => dispatch({ type: SET_IS_LOADING, payload });

/* -----------------   REDUCERS   ------------------ */

const initialState = {
  colorCount: {},
  colorSheetTab: 'list',
  currentArtist: 0,
  currentSong: 0,
  currentUnit: {},

  isLoading: false,
  latestUnits: [],
  membersList: [],

  shouldReset: true,
};

export default function reducer(prevState = initialState, action) {
  const newState = Object.assign({}, prevState);

  switch (action.type) {
    case SET_COLOR_COUNT:
      newState.colorCount = action.payload;
      break;

    case SET_COLOR_SHEET_TAB:
      newState.colorSheetTab = action.payload;
      break;

    case SET_CURRENT_ARTIST:
      newState.currentArtist = action.payload;
      break;

    case SET_CURRENT_SONG:
      newState.currentSong = action.payload;
      break;

    case SET_CURRENT_UNIT:
      newState.currentUnit = action.payload;
      break;

    case SET_LATEST_UNITS:
      newState.latestUnits = action.payload;
      break;

    case SET_MEMBERS_LIST:
      newState.membersList = action.payload;
      break;

    case SET_SHOULD_RESET:
      newState.shouldReset = action.payload;
      break;

    case SET_IS_LOADING:
      newState.isLoading = action.payload;
      break;

    default:
      return prevState;
  }

  return newState;
}

/* ---------------   DISPATCHERS   ----------------- */

export const init = () => async (dispatch) => {
  // Start database
  // await API.init();



  // dispatch(initDatabase());
  // dispatch(getColorCount());s
  // dispatch(parseArtists());
  // dispatch(parseMembers());
  // dispatch(parseSongs());
  // dispatch(getLatestUnits());
};

// const getColorCount = () => (dispatch) => {
//   const count = API.get('/colors/count');
//   dispatch(setColorCount(count));
// };

export const parseMembers = () => (dispatch, getState) => {
  const MEMBERS = _.cloneDeep(getState().database.members);
  const orderedMembers = _.sortBy(MEMBERS, ['name', 'birthdate']).map(member => member.id);
  dispatch(setMembersList(orderedMembers));
};

export const getLatestUnits = () => (dispatch, getState) => {
  const latestUnits = API.get('/units/latest');
  dispatch(setLatestUnits(latestUnits));
};

export const toggleIsLoading = bool => (dispatch, getState) => {
  if (bool) {
    dispatch(setIsLoading(bool));
  } else {
    const value = getState().app.isLoading;
    dispatch(setIsLoading(!value));
  }
};

export const toggleColorSheetTab = event => (dispatch) => {
  const { id } = event.target;
  dispatch(setColorSheetTab(id));
};

export const updateCurrentSong = id => (dispatch, getState) => {
  dispatch(setCurrentSong(id));
};

export const updateCurrentUnit = (unit, artist) => (dispatch) => {

  // let { selectedArtist, selectedUnit } = getState().app;

  // if (id) {
  //   const unit = API.get(`/units/${id}`);
  //   selectedArtist = unit.bandId;
  //   selectedUnit = unit;
  // }
  // const currentArtist = API.get(`/artists/${selectedArtist}`);
  // const currentUnit = API.get(`/units/${selectedUnit.id}/all`);

  const currentUnit = Object.assign({}, unit);
  const currentArtist = Object.assign({}, artist);
  console.log(currentUnit);
  console.log(currentArtist);

  // Get unique main colors to the members
  const colorDict = {};
  // Create color dictionary
  for (let i = 0; i < currentUnit.members.length; i++) {
    const member = currentUnit.members[i];
    if (colorDict[member.color.id] === undefined) {
      colorDict[member.color.id] = true;
    }
  }
  // Check color availability
  for (let i = 0; i < currentUnit.members.length; i++) {
    const member = currentUnit.members[i];
    if (colorDict[member.color.id]) {
      colorDict[member.color.id] = false;
    } else if (colorDict[member.altColor.id] === undefined) {
      currentUnit.members[i].color.id = member.altColor.id;
    } else {
      // If altColor is taken, assign random color
      let newColor = Math.floor(Math.random() * 36) + 1;
      while (colorDict[newColor] !== undefined) {
        newColor += 1;
        if (newColor > 36) newColor = 1;
      }
      newColor = `col${makeSixDigit(newColor)}`;
      currentUnit.members[i].color = API.get(`/color/${newColor}`);
    }
  }

  dispatch(setCurrentArtist(currentArtist));
  dispatch(setCurrentUnit(currentUnit));
  dispatch(setCurrentSong(0));
};

export const updateLatestUnits = id => (dispatch, getState) => {
  const unit = id || getState().app.selectedUnit;
  const latestUnits = [...getState().app.latestUnits];
  const containsInLatest = latestUnits.indexOf(unit.id);
  if (containsInLatest !== -1) {
    latestUnits.splice(containsInLatest, 1);
  }
  if (unit.id) {
    latestUnits.unshift(unit.id);
    if (latestUnits.length > 5) {
      latestUnits.pop();
    }
    dispatch(setLatestUnits(latestUnits));
    API.post('/units/latest', latestUnits);
  }
};

export const updateShouldReset = (bool = false) => (dispatch) => {
  dispatch(setShouldReset(bool));
};


