import _ from 'lodash';

import API from '../api';
import { initDatabase } from './database';

/* ------------------   ACTIONS   ------------------ */

const SET_ARTISTS_LIST = 'SET_ARTISTS_LIST';
const SET_ARTISTS_LIST_BACKUP = 'SET_ARTISTS_LIST_BACKUP';
const SET_ARTIST_PAGE_TAB = 'SET_ARTIST_PAGE_TAB';
const SET_ARTISTS_SEARCH_INDEXATION = 'SET_ARTISTS_SEARCH';
const SET_COLOR_COUNT = 'SET_COLOR_COUNT';
const SET_COLOR_SHEET_TAB = 'SET_COLOR_SHEET_TAB';
const SET_CURRENT_ARTIST = 'SET_CURRENT_ARTIST';
const SET_CURRENT_UNIT = 'SET_CURRENT_UNIT';
const SET_SELECTED_ARTIST = 'SET_SELECTED_ARTIST';
const SET_SELECTED_UNIT = 'SET_SELECTED_UNIT';
const SET_SELECTED_UNITS = 'SET_SELECTED_UNITS';

/* --------------   ACTION CREATORS   -------------- */

export const setArtistsList = payload => dispatch => dispatch({ type: SET_ARTISTS_LIST, payload });
export const setArtistsListBackUp = payload => dispatch => dispatch({ type: SET_ARTISTS_LIST_BACKUP, payload });
export const setArtistPageTab = payload => dispatch => dispatch({ type: SET_ARTIST_PAGE_TAB, payload });
export const setArtistsSearchIndexation = payload => dispatch => dispatch({ type: SET_ARTISTS_SEARCH_INDEXATION, payload });
export const setColorCount = payload => dispatch => dispatch({ type: SET_COLOR_COUNT, payload });
export const setColorSheetTab = payload => dispatch => dispatch({ type: SET_COLOR_SHEET_TAB, payload });
export const setCurrentArtist = payload => dispatch => dispatch({ type: SET_CURRENT_ARTIST, payload });
export const setCurrentUnit = payload => dispatch => dispatch({ type: SET_CURRENT_UNIT, payload });
export const setSelectedArtist = payload => dispatch => dispatch({ type: SET_SELECTED_ARTIST, payload });
export const setSelectedUnit = payload => dispatch => dispatch({ type: SET_SELECTED_UNIT, payload });
export const setSelectedUnits = payload => dispatch => dispatch({ type: SET_SELECTED_UNITS, payload });

/* -----------------   REDUCERS   ------------------ */

const initialState = {
  artistList: [],
  artistListBackUp: [],
  artistPageTab: 0,
  artistsSearchIndexation: {},
  colorCount: {},
  colorSheetTab: 'list',
  currentArtist: 0,
  currentUnit: {},
  currentUnits: {},
  selectedArtist: 0,
  selectedUnit: {},
  selectedUnits: {},
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

    case SET_ARTIST_PAGE_TAB:
      newState.artistPageTab = action.payload;
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

    case SET_CURRENT_ARTIST:
      newState.currentArtist = action.payload;
      break;

    case SET_CURRENT_UNIT:
      newState.currentUnit = action.payload;
      break;

    case SET_SELECTED_ARTIST:
      newState.selectedArtist = action.payload;
      break;

    case SET_SELECTED_UNIT:
      newState.selectedUnit = action.payload;
      break;

    case SET_SELECTED_UNITS:
      newState.selectedUnits = action.payload;
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
  const count = API.get('/colors/count');
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

export const updateSelectedArtist = e => (dispatch, getState) => {
  const artistId = getState().app.artistList[[].indexOf.call(e.currentTarget.children, e.target.closest('tr'))];
  dispatch(setSelectedArtist(artistId));
  // Reset selected unit
  dispatch(setSelectedUnit({}));

  // Update selected Units
  const units = API.get(`/artists/${artistId}/units`);
  dispatch(setSelectedUnits(units));
};

export const updateSelectedUnit = id => (dispatch) => {
  const unit = API.get(`/units/${id}`);
  dispatch(setSelectedUnit(unit));
};

export const toggleColorSheetTab = event => (dispatch) => {
  const { id } = event.target;
  dispatch(setColorSheetTab(id));
};

export const switchUnitsTab = event => (dispatch) => {
  const { id } = event.target;
  dispatch(setArtistPageTab(id));
};

export const updateCurrentUnit = () => (dispatch, getState) => {
  const { selectedArtist, selectedUnit } = getState().app;
  const currentArtist = API.get(`/artists/${selectedArtist}`);
  dispatch(setCurrentArtist(currentArtist));
  const currentUnit = API.get(`/units/${selectedUnit.id}/all`);
  dispatch(setCurrentUnit(currentUnit));
};
