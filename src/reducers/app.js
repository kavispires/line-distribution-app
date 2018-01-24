import _ from 'lodash';
import API from '../api';

import { ARTISTS } from '../constants';

/* ------------------   ACTIONS   ------------------ */

const SET_ARTISTS = 'SET_ARTISTS';
const SET_ARTISTS_LIST = 'SET_ARTISTS_LIST';
const SET_ARTISTS_LIST_BACKUP = 'SET_ARTISTS_LIST_BACKUP';
const SET_ARTISTS_SEARCH_INDEXATION = 'SET_ARTISTS_SEARCH';
const SET_COLOR_COUNT = 'SET_COLOR_COUNT';
const SET_CURRENT_BAND = 'SET_CURRENT_BAND';
const SET_COLOR_LIST = 'SET_COLOR_LIST';
const SET_POSITION_LIST = 'SET_POSITION_LIST';

/* --------------   ACTION CREATORS   -------------- */

export const setArtists = payload => dispatch => dispatch({ type: SET_ARTISTS, payload });
export const setArtistsList = payload => dispatch => dispatch({ type: SET_ARTISTS_LIST, payload });
export const setArtistsListBackUp = payload => dispatch => dispatch({ type: SET_ARTISTS_LIST_BACKUP, payload });
export const setArtistsSearchIndexation = payload => dispatch => dispatch({ type: SET_ARTISTS_SEARCH_INDEXATION, payload });
export const setColorCount = payload => dispatch => dispatch({ type: SET_COLOR_COUNT, payload });
export const setColorList = payload => dispatch => dispatch({ type: SET_COLOR_LIST, payload });
export const setCurrentBand = payload => dispatch => dispatch({ type: SET_CURRENT_BAND, payload });
export const setPositionList = payload => dispatch => dispatch({ type: SET_POSITION_LIST, payload });

/* -----------------   REDUCERS   ------------------ */

const initialState = {
  artists: {},
  artistList: [],
  artistListBackUp: [],
  artistsSearchIndexation: {},
  colors: {},
  colorList: {},
  colorCount: {},
  currentBand: 0,
  positionList: {}
};

export default function reducer(prevState = initialState, action) {

  const newState = Object.assign({}, prevState);

  switch (action.type) {

    case SET_ARTISTS:
      newState.artists = action.payload;
      break;

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

    case SET_COLOR_LIST:
      newState.colorList = action.payload;
      break;

    case SET_CURRENT_BAND:
      newState.currentBand = action.payload;
      break;

    case SET_POSITION_LIST:
      newState.positionList = action.payload;
      break;

    default:
      return prevState;

  }

  return newState;

}

/* ---------------   DISPATCHERS   ----------------- */

export const init = () => (dispatch) => {
  dispatch(parseArtists());
  dispatch(parseColors());
  dispatch(parsePositions());
}

export const parseArtists = () => (dispatch, getState) => {
  if (Object.keys(getState().app.artists).length > 0) return;
  /* Get list of artists
   * Remove artists with no members
   * Split members and colors
   * Sort in alphabetical order
   * Update state
   */
  const newArtists = {};
  const artistsCopy = Object.assign({}, ARTISTS);
  const searchIndexation = {};
  const colorCount = {};
  for (let id in artistsCopy) {
    if (artistsCopy.hasOwnProperty(id)
      && artistsCopy[id].name !== undefined
      && artistsCopy[id].members !== undefined
      && artistsCopy[id].colors !== undefined) {
      const band = Object.assign({}, artistsCopy[id]);
      // Convert members to array
      band.members = band.members.split(', ');
      // Convert colors to array
      band.colors = band.colors.split(', ');
      // Set bandName
      if (band.version === undefined) {
        band.bandName = band.name;
      } else {
        band.bandName = `${band.name} (${band.version})`;
      }
      // Add to newArtists
      if (band.members.length === band.colors.length) {
        newArtists[id] = band;
        searchIndexation[id] = `${band.bandName} ${band.othernames} ${band.version} ${band.members}`.toLowerCase()  ;
      } else {
        console.warn(`${band.bandName} was not added. (M: ${band.members.length} vs C: ${band.colors.length}`);
      }
      // Count colors for Color Sheet
      band.colors.forEach(color => {
        if (colorCount[color] === undefined) {
          colorCount[color] = 1;
        } else {
          colorCount[color]++;
        }
      });
    }
  }

  dispatch(setArtists(newArtists));
  dispatch(setArtistsSearchIndexation(searchIndexation));
  dispatch(setColorCount(colorCount));

  // Order by Band Name
  const orderedArtists = _.sortBy(newArtists, ['bandName']).map(band => band.id);
  dispatch(setArtistsList(orderedArtists));
  dispatch(setArtistsListBackUp(orderedArtists));
};

const parseColors = () => (dispatch) => {
  const colorList = API.fetchAllColors();
  dispatch(setColorList(colorList));
};

const parsePositions = () => (dispatch) => {
  const positionList = API.fetchAllPositions();
  dispatch(setPositionList(positionList));
};

export const updateCurrentBand = (e) => (dispatch, getState) => {
  const bandId = getState().app.artistList[[].indexOf.call(e.currentTarget.children, e.target.closest('tr'))];
  dispatch(setCurrentBand(0));
  dispatch(setCurrentBand(bandId));
};

export const filter = (e) => (dispatch, getState) => {
  if (typeof e === 'string') {
    return dispatch(setArtistsList([...getState().app.artistListBackUp]));
  }
  const value = e.target.value.toLowerCase();
  if (value.length > 0 && value.length < 3) return;
  const artistsSearchIndexation = getState().app.artistsSearchIndexation;
  if (value.length === 0) {
    dispatch(setArtistsList([...getState().app.artistListBackUp]));
  } else {
    // Find band names with value and push id to artistList
    const filteredArtists = [];
    for (let key in artistsSearchIndexation) {
      if (artistsSearchIndexation.hasOwnProperty(key)) {
        const artist = artistsSearchIndexation[key];
        if (artist.includes(value)) {
          filteredArtists.push(key);
        }
      }
    }
    dispatch(setArtistsList(filteredArtists));
  }
};
