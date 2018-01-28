import _ from 'lodash';

import API from '../api';
import { initDatabase } from './database';

/* ------------------   ACTIONS   ------------------ */

const SET_ARTISTS_LIST = 'SET_ARTISTS_LIST';
const SET_ARTISTS_LIST_BACKUP = 'SET_ARTISTS_LIST_BACKUP';
const SET_ARTISTS_SEARCH_INDEXATION = 'SET_ARTISTS_SEARCH';
const SET_COLOR_COUNT = 'SET_COLOR_COUNT';
const SET_COLOR_SHEET_TAB = 'SET_COLOR_SHEET_TAB';
const SET_CURRENT_BAND = 'SET_CURRENT_BAND';

/* --------------   ACTION CREATORS   -------------- */

export const setArtistsList = payload => dispatch => dispatch({ type: SET_ARTISTS_LIST, payload });
export const setArtistsListBackUp = payload => dispatch => dispatch({ type: SET_ARTISTS_LIST_BACKUP, payload });
export const setArtistsSearchIndexation = payload => dispatch => dispatch({ type: SET_ARTISTS_SEARCH_INDEXATION, payload });
export const setColorCount = payload => dispatch => dispatch({ type: SET_COLOR_COUNT, payload });
export const setColorSheetTab = payload => dispatch => dispatch({ type: SET_COLOR_SHEET_TAB, payload });
export const setCurrentBand = payload => dispatch => dispatch({ type: SET_CURRENT_BAND, payload });

/* -----------------   REDUCERS   ------------------ */

const initialState = {
  artists: {},
  artistList: [],
  artistListBackUp: [],
  artistsSearchIndexation: {},
  colorCount: {},
  colorSheetTab: 'list',
  currentBand: 0,
};

export default function reducer(prevState = initialState, action) {

  const newState = Object.assign({}, prevState);

  switch (action.type) {

    case SET_ARTISTS_LIST:
      newState.artistList = action.payload;
      break;

    case SET_ARTISTS_LIST_BACKUP:
      newState.artistListBackUp = action.payload;
      break;

    case SET_ARTISTS_SEARCH_INDEXATION:
      newState.artistsSearchIndexation = action.payload;
      break;

    case SET_COLOR_COUNT:
      newState.colorCount = action.payload;
      break;

    case SET_COLOR_SHEET_TAB:
      newState.colorSheetTab = action.payload;
      break;

    case SET_CURRENT_BAND:
      newState.currentBand = action.payload;
      break;

    default:
      return prevState;
  }

  return newState;
}

/* ---------------   DISPATCHERS   ----------------- */

export const init = () => (dispatch) => {
  console.log('INIT WAS CALLED');
  dispatch(initDatabase());
  dispatch(getColorCount());
  dispatch(parseArtists());
};

const getColorCount = () => (dispatch) => {
  const count = API.get('./colors/count');
  dispatch(setColorCount(count));
};

export const parseArtists = () => (dispatch, getState) => {
  // if (Object.keys(getState().app.artists).length > 0) return;
  /* Get list of artists
   * Remove artists with no members
   * Split members and colors
   * Sort in alphabetical order
   * Update state
   */
  const ARTISTS = _.cloneDeep(getState().database.artists);

  const searchIndexation = {};

  // Loop though ARTISTS to set indexation
  Object.keys(ARTISTS).forEach((id) => {
    const artist = ARTISTS[id];
    searchIndexation[id] = `${artist.name} ${artist.otherNames} ${artist.allMembers.join(' ')}`.toLowerCase();
  });

  // Set Indexation
  dispatch(setArtistsSearchIndexation(searchIndexation));

  // Order by Band Name
  const orderedArtists = _.sortBy(ARTISTS, ['name']).map(band => band.id);
  dispatch(setArtistsList(orderedArtists));
  dispatch(setArtistsListBackUp(orderedArtists));
};

export const updateCurrentBand = e => (dispatch, getState) => {
  const bandId = getState().app.artistList[[].indexOf.call(e.currentTarget.children, e.target.closest('tr'))];
  dispatch(setCurrentBand(0));
  dispatch(setCurrentBand(bandId));
};

export const filter = e => (dispatch, getState) => {
  if (typeof e === 'string') {
    return dispatch(setArtistsList([...getState().app.artistListBackUp]));
  }
  const value = e.target.value.toLowerCase();
  if (value.length > 0 && value.length < 3) return;
  const { artistsSearchIndexation } = getState().app;
  if (value.length === 0) {
    dispatch(setArtistsList([...getState().app.artistListBackUp]));
  } else {
    // Find band names with value and push id to artistList
    const filteredArtists = [];
    Object.keys(artistsSearchIndexation).forEach((key) => {
      const artist = artistsSearchIndexation[key];
      if (artist.includes(value)) {
        filteredArtists.push(key);
      }
    });

    dispatch(setArtistsList(filteredArtists));
  }
};

export const toggleColorSheetTab = event => (dispatch) => {
  const { id } = event.target;
  dispatch(setColorSheetTab(id));
};
