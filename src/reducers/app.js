import API from '../api';

import { makeSixDigit } from '../utils';

import { updateCurrentSongInfo } from './results';

/* ------------------   ACTIONS   ------------------ */

const SET_CURRENT_ARTIST = 'SET_CURRENT_ARTIST';
const SET_CURRENT_SONG = 'SET_CURRENT_SONG';
const SET_CURRENT_UNIT = 'SET_CURRENT_UNIT';
const SET_LATEST_UNITS = 'SET_LATEST_UNITS';
const SET_MEMBERS_LIST = 'SET_MEMBERS_LIST';

const SET_SHOULD_RESET = 'SET_SHOULD_RESET';

const SET_IS_LOADING = 'SET_IS_LOADING';

/* --------------   ACTION CREATORS   -------------- */

export const setCurrentArtist = payload => dispatch => dispatch({ type: SET_CURRENT_ARTIST, payload });
export const setCurrentSong = payload => dispatch => dispatch({ type: SET_CURRENT_SONG, payload });
export const setCurrentUnit = payload => dispatch => dispatch({ type: SET_CURRENT_UNIT, payload });

export const setLatestUnits = payload => dispatch => dispatch({ type: SET_LATEST_UNITS, payload });
export const setMembersList = payload => dispatch => dispatch({ type: SET_MEMBERS_LIST, payload });

export const setShouldReset = payload => dispatch => dispatch({ type: SET_SHOULD_RESET, payload });
export const setIsLoading = payload => dispatch => dispatch({ type: SET_IS_LOADING, payload });

/* -----------------   REDUCERS   ------------------ */

const initialState = {
  currentArtist: {},
  currentSong: {},
  currentUnit: {},

  isLoading: false,
  latestUnits: [],
  membersList: [],

  shouldReset: true,
};

export default function reducer(prevState = initialState, action) {
  const newState = Object.assign({}, prevState);

  switch (action.type) {
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

export const getLatestUnits = () => (dispatch) => {
  const latestUnits = API.get('/units/latest');
  dispatch(setLatestUnits(latestUnits));
};

export const toggleIsLoading = bool => (dispatch, getState) => {
  if (bool !== undefined) {
    dispatch(setIsLoading(bool));
  } else {
    const value = getState().app.isLoading;
    dispatch(setIsLoading(!value));
  }
};

export const updateCurrentSong = songId => (dispatch) => {
  const song = API.get(`/songs/${songId}`);
  dispatch(setCurrentSong(song));
  dispatch(updateCurrentSongInfo(song));
};

export const updateCurrentUnit = (unit, artist) => (dispatch) => {
  const currentUnit = Object.assign({}, unit);
  const currentArtist = Object.assign({}, artist);

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
  dispatch(setCurrentSong({}));
};

export const updateShouldReset = (bool = false) => (dispatch) => {
  dispatch(setShouldReset(bool));
};
