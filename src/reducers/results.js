import _ from 'lodash';

import API from '../api';

/* ------------------   ACTIONS   ------------------ */

const SET_ORIGINAL_ARTIST = 'SET_ORIGINAL_ARTIST';
const SET_RESULTS = 'SET_RESULTS';
const SET_RESULT_TYPE = 'SET_RESULT_TYPE';
const SET_SONG_TITLE = 'SET_SONG_TITLE';
const SET_SONG_TYPE = 'SET_SONG_TYPE';
const TOGGLE_MODAL = 'TOGGLE_MODAL';

/* --------------   ACTION CREATORS   -------------- */

export const setOriginalArtist = payload => dispatch => dispatch({ type: SET_ORIGINAL_ARTIST, payload });
export const setResults = payload => dispatch => dispatch({ type: SET_RESULTS, payload });
export const setResultType = payload => dispatch => dispatch({ type: SET_RESULT_TYPE, payload });
export const setSongTitle = payload => dispatch => dispatch({ type: SET_SONG_TITLE, payload });
export const setSongType = payload => dispatch => dispatch({ type: SET_SONG_TYPE, payload });
export const toogleModal = payload => dispatch => dispatch({ type: TOGGLE_MODAL, payload });

/* -----------------   REDUCERS   ------------------ */

const initialState = {
  originalArtist: '',
  results: [],
  saveModal: false,
  showPercentage: false,
  songTitle: '',
  songType: '',
  tempInput: '',
};

export default function reducer(prevState = initialState, action) {
  const newState = Object.assign({}, prevState);

  switch (action.type) {
    case SET_ORIGINAL_ARTIST:
      newState.originalArtist = action.payload;
      break;

    case SET_RESULTS:
      newState.results = action.payload;
      break;

    case SET_RESULT_TYPE:
      newState.showPercentage = action.payload;
      break;

    case SET_SONG_TITLE:
      newState.songTitle = action.payload;
      break;

    case SET_SONG_TYPE:
      newState.songType = action.payload;
      break;

    case TOGGLE_MODAL:
      newState.saveModal = action.payload;
      break;

    default:
      return prevState;
  }

  return newState;
}

/* ---------------   DISPATCHERS   ----------------- */

export const calculateResults = () => (dispatch, getState) => {
  const durations = [...getState().distribute.durations];
  const percentages = [...getState().distribute.percentages];
  const CURRENT_UNIT = getState().app.currentUnit;
  // Find Max value
  const max = Math.max.apply(null, durations);
  // Sort durations
  const sortedDurations = [...durations].sort((a, b) => b - a);
  // Push results in order with relative percentage
  const results = [];
  sortedDurations.forEach((val, i) => {
    const index = durations.indexOf(val);
    const relativePercentage = Math.round((durations[index] * 100) / max);
    const member = {
      name: CURRENT_UNIT.members[index].name,
      colorClass: CURRENT_UNIT.members[index].color.class,
      relativePercentage,
      percentage: percentages[index],
      duration: durations[index],
    };
    results.push(member);
    durations[index] = null;
    sortedDurations[i] = null;
  });
  dispatch(setResults(results));
};

export const handleSwitch = () => (dispatch, getState) => {
  dispatch(setResultType(!getState().creator.showPercentage));
};

export const openSaveModal = () => (dispatch, getState) => {
  const modal = getState().results.saveModal;
  dispatch(toogleModal(!modal));
};

export const handleSongTitle = event => (dispatch) => {
  const { value } = event.target;
  dispatch(setSongTitle(value));
};

export const handleSongType = event => (dispatch) => {
  const { value } = event.target;
  dispatch(setSongType(value));
};

export const handleOriginalArtist = event => (dispatch) => {
  const { value } = event.target;
  dispatch(setOriginalArtist(value));
};

export const saveSong = (save = true) => (dispatch, getState) => {
  const userUid = getState().user.user.uid;
  const userEmail = getState().user.user.email;

  const unitId = getState().app.currentUnit.id;
  const title = getState().results.songTitle;
  const type = getState().results.songType;
  let { originalArtist } = getState().results;
  const { lyrics } = getState().lyrics;
  const distribution = _.cloneDeep(getState().distribute.history);
  const { currentSong } = getState().app.currentSong;

  let songId = null;
  if (currentSong && currentSong.id) {
    songId = currentSong.id;
  }

  // Reassign IDs to distribution
  const MEMBERS = getState().app.currentUnit.members;
  for (let i = 0; i < distribution.length; i++) {
    distribution[i].memberId = MEMBERS[distribution[i].memberId].id;
  }

  if (!originalArtist) originalArtist = getState().app.currentArtist.name;

  const newJSON = {
    unitId,
    title,
    type,
    originalArtist,
    lyrics,
    distribution,
    userUid,
    userEmail,
  };

  if (songId) {
    newJSON.id = songId;
  }

  if (save) {
    const result = API.post('/songs', newJSON);
    if (result) {
      dispatch(toogleModal(false));
    }
  }
};

export const resetSongInfo = () => (dispatch) => {
  dispatch(setSongTitle(''));
  dispatch(setSongType(''));
  dispatch(setOriginalArtist(''));
};

export const updateCurrentSongInfo = song => (dispatch) => {
  dispatch(setSongTitle(song.title));
  dispatch(setSongType(song.type));
  dispatch(setOriginalArtist(song.originalArtist));
};
