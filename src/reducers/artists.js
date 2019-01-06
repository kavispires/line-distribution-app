import _ from 'lodash';

import API from '../api';

import { setLoading } from './app';
import { parseResponse } from '../utils';

/* ------------------   ACTIONS   ------------------ */

const SET_ARTIST_LIST = 'SET_ARTIST_LIST';
const SET_SEARCH_QUERY = 'SET_SEARCH_QUERY';

/* --------------   ACTION CREATORS   -------------- */

export const setArtistList = payload => dispatch =>
  dispatch({ type: SET_ARTIST_LIST, payload });
export const setSearchQuery = payload => dispatch =>
  dispatch({ type: SET_SEARCH_QUERY, payload });

/* -----------------   REDUCERS   ------------------ */

const initialState = {
  artistList: {},
  searchQuery: '',
  selectedArtist: {},
  selectedUnit: {},
  selectedUnitSongs: [],
  selectedUnits: {},
  userFavoriteArtists: {},
  userLatestArtists: [],
};

export default function reducer(prevState = initialState, action) {
  const newState = Object.assign({}, prevState);

  switch (action.type) {
    case SET_ARTIST_LIST:
      newState.artistList = action.payload;
      break;

    case SET_SEARCH_QUERY:
      newState.searchQuery = action.payload;
      break;

    default:
      return prevState;
  }

  return newState;
}

/* ---------------   DISPATCHERS   ----------------- */

export const loadArtists = () => async dispatch => {
  dispatch(setLoading(true, 'artists'));
  const allArtists = await API.get('/artists');
  const artistList = parseResponse(allArtists);

  console.log(artistList);
  const sortedArtistList = _.sortBy(artistList, [a => a.name.toLowerCase()]);

  dispatch(setArtistList(sortedArtistList));

  // Also, load latest artists, and favorite units
  // dispatch(loadUserArtists());
  dispatch(setLoading(false, 'artists'));
};

export const loadUserArtists = () => async (dispatch, getState) => {};

export const loadArtist = (artistId, queryParams) => async (
  dispatch,
  getState
) => {};

export const updateSearchQuery = value => dispatch => {
  if (value === '' || value.length > 2) {
    dispatch(setSearchQuery(value.toLowerCase()));
  }
};

export const updateLatestUnits = id => async (dispatch, getState) => {};

export const switchUnitsTab = e => async dispatch => {};

// import _ from 'lodash';

// import { setLoading } from './app';
// import { API } from './db';

// /* ------------------   ACTIONS   ------------------ */

// const SET_ARTIST_LIST = 'SET_ARTIST_LIST';

// const SET_SELECTED_ARTIST = 'SET_SELECTED_ARTIST';
// const SET_SELECTED_UNIT = 'SET_SELECTED_UNIT';
// const SET_SELECTED_UNIT_SONGS = 'SET_SELECTED_UNIT_SONGS';
// const SET_SELECTED_UNITS = 'SET_SELECTED_UNITS';
// const SET_USER_FAVORITE_ARTISTS = 'SET_USER_FAVORITE_ARTISTS';
// const SET_USER_LATEST_ARTISTS = 'SET_USER_LATEST_ARTISTS';

// /* --------------   ACTION CREATORS   -------------- */

// export const setArtistList = payload => dispatch =>
//   dispatch({ type: SET_ARTIST_LIST, payload });

// export const setSelectedArtist = payload => dispatch =>
//   dispatch({ type: SET_SELECTED_ARTIST, payload });
// export const setSelectedUnit = payload => dispatch =>
//   dispatch({ type: SET_SELECTED_UNIT, payload });
// export const setSelectedUnitSongs = payload => dispatch =>
//   dispatch({ type: SET_SELECTED_UNIT_SONGS, payload });
// export const setSelectedUnits = payload => dispatch =>
//   dispatch({ type: SET_SELECTED_UNITS, payload });
// export const setUserFavoriteArtists = payload => dispatch =>
//   dispatch({ type: SET_USER_FAVORITE_ARTISTS, payload });
// export const setUserLatestArtists = payload => dispatch =>
//   dispatch({ type: SET_USER_LATEST_ARTISTS, payload });

// /* -----------------   REDUCERS   ------------------ */

// export const initialState = {
//   artistList: {},
//   searchQuery: '',
//   selectedArtist: {},
//   selectedUnit: {},
//   selectedUnitSongs: [],
//   selectedUnits: {},
//   userFavoriteArtists: {},
//   userLatestArtists: [],
// };

// export default function reducer(prevState = initialState, action) {
//   const newState = Object.assign({}, prevState);

//   switch (action.type) {
//     case SET_ARTIST_LIST:
//       newState.artistList = action.payload;
//       break;

//     case SET_SEARCH_QUERY:
//       newState.searchQuery = action.payload;
//       break;

//     case SET_SELECTED_ARTIST:
//       newState.selectedArtist = action.payload;
//       break;

//     case SET_SELECTED_UNIT:
//       newState.selectedUnit = action.payload;
//       break;

//     case SET_SELECTED_UNIT_SONGS:
//       newState.selectedUnitSongs = action.payload;
//       break;

//     case SET_SELECTED_UNITS:
//       newState.selectedUnits = action.payload;
//       break;

//     case SET_USER_LATEST_ARTISTS:
//       newState.userLatestArtists = action.payload;
//       break;

//     case SET_USER_FAVORITE_ARTISTS:
//       newState.userFavoriteArtists = action.payload;
//       break;

//     default:
//       return prevState;
//   }

//   return newState;
// }

// /* ---------------   DISPATCHERS   ----------------- */

// export const loadArtists = () => async dispatch => {
//   dispatch(setLoading(true, 'artists'));
//   const artistList = await API.get('/artists');

//   const sortedArtistList = _.sortBy(artistList, [a => a.name.toLowerCase()]);

//   dispatch(setArtistList(sortedArtistList));

//   // Also, load latest artists, and favorite units
//   dispatch(loadUserArtists());
//   dispatch(setLoading(false, 'artists'));
// };

// export const loadUserArtists = () => async (dispatch, getState) => {
//   const { user } = getState().auth;
//   if (user.uid) {
//     const userLatestArtists = await API.get(`/users/${user.uid}/latest`);
//     dispatch(setUserLatestArtists(userLatestArtists));
//   }
// };

// export const loadArtist = (artistId, queryParams) => async (
//   dispatch,
//   getState
// ) => {
//   dispatch(setLoading(true, 'artist'));
//   const artist = await API.get(`/artists/${artistId}`);

//   // Update selected Units
//   const units = await API.get(`/artists/${artistId}/units`);

//   // Reset selected unit
//   const unitsIds = units ? Object.keys(units) : [];
//   let unit = {};
//   if (unitsIds.length > 0) {
//     let unitId = unitsIds[0];

//     if (unitsIds[queryParams]) {
//       unitId = queryParams;
//     }

//     unit = await API.get(`/units/${unitId}`);
//   }

//   dispatch(setSelectedUnit(unit));
//   dispatch(setSelectedUnits(units));
//   dispatch(setSelectedArtist(artist));

//   dispatch(setLoading(false, 'artist'));
// };

// export const updateLatestUnits = id => async (dispatch, getState) => {
//   const unitId = id || getState().app.currentUnit.id;
//   const { user } = getState().auth;
//   if (id && user.uid) {
//     let latestUnits = [];
//     const { userLatestArtists } = getState().artists;
//     if (userLatestArtists.length > 0) {
//       latestUnits = userLatestArtists.map(unit => unit.id);
//     }
//     if (id === latestUnits[0]) {
//       return null;
//     }

//     // Check if it already contains, then remove it
//     const containsInLatest = latestUnits.indexOf(unitId);
//     if (containsInLatest !== -1) {
//       latestUnits.splice(containsInLatest, 1);
//     }
//     // Add it to the beginning
//     latestUnits.unshift(id);
//     // Remove the last one if array is larger than 5
//     if (latestUnits.length > 5) {
//       latestUnits.pop();
//     }
//     // Post then reload app
//     const newUserLatestArtists = await API.post(
//       `/users/${user.uid}/latest`,
//       latestUnits
//     );

//     dispatch(setUserLatestArtists(newUserLatestArtists));
//   }
// };

// export const switchUnitsTab = e => async dispatch => {
//   const { id } = e.target;

//   const unit = await API.get(`/units/${id}`);

//   dispatch(setSelectedUnit(unit));
// };
