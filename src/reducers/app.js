import _ from 'lodash';

import { ARTISTS } from '../constants';

/* ------------------   ACTIONS   ------------------ */

const SET_ARTISTS = 'SET_ARTISTS';
const SET_ARTISTS_LIST = 'SET_ARTISTS_LIST';
const SET_ARTISTS_LIST_BACKUP = 'SET_ARTISTS_LIST_BACKUP';
const SET_COLOR_COUNT = 'SET_COLOR_COUNT';
const SET_CURRENT_BAND = 'SET_CURRENT_BAND';

/* --------------   ACTION CREATORS   -------------- */

export const setArtists = payload => dispatch => dispatch({ type: SET_ARTISTS, payload });
export const setArtistsList = payload => dispatch => dispatch({ type: SET_ARTISTS_LIST, payload });
export const setArtistsListBackUp = payload => dispatch => dispatch({ type: SET_ARTISTS_LIST_BACKUP, payload });
export const setColorCount = payload => dispatch => dispatch({ type: SET_COLOR_COUNT, payload });
export const setCurrentBand = payload => dispatch => dispatch({ type: SET_CURRENT_BAND, payload });

/* -----------------   REDUCERS   ------------------ */

const initialState = {
  artists: {},
  artistList: [],
  artistListBackUp: [],
  colorCount: {},
  currentBand: {
    bandName: 'Test Band',
    colors: ['orange', 'purple', 'red', 'green', 'pink', 'sand', 'forest', 'blood', 'grey', 'teal', 'redViolet', 'cyan', 'turquoise', 'lime', 'navy', 'brown', 'hotPink', 'violet', 'darkGreen', 'darkGrey', 'redOrange', 'pee', 'olive', 'plum', 'yellow'],
    genre: 'Test Genre',
    id: 1000,
    members: ['orange', 'purple', 'red', 'green', 'pink', 'sand', 'forest', 'blood', 'grey', 'teal', 'redViolet', 'cyan', 'turquoise', 'lime', 'navy', 'brown', 'hotPink', 'violet', 'darkGreen', 'darkGrey', 'redOrange', 'pee', 'olive', 'plum', 'yellow'],
  },
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

    case SET_COLOR_COUNT:
      newState.colorCount = action.payload;
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
      } else {
        console.log(`${band.bandName} was not added. (M: ${band.members.length} vs C: ${band.colors.length}`);
      }

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
  dispatch(setColorCount(colorCount));

  // Order by Band Name
  const orderedArtists = _.sortBy(newArtists, ['bandName']).map(band => band.id);
  dispatch(setArtistsList(orderedArtists));
  dispatch(setArtistsListBackUp(orderedArtists));
};

export const updateCurrentBand = (e) => (dispatch, getState) => {
  const bandId = getState().app.artistList[[].indexOf.call(e.currentTarget.children, e.target.closest('tr'))];
  const currentBand = getState().app.artists[bandId];
  dispatch(setCurrentBand({}));
  dispatch(setCurrentBand(currentBand));
};

export const filter = (e) => (dispatch, getState) => {
  const value = e.target.value.toLowerCase();
  if (value.length > 0 && value.length < 3) return;
  const artists = getState().app.artists;
  if (value.length === 0) {
    dispatch(setArtistsList([...getState().app.artistListBackUp]));
  } else {
    // Find band names with value and push id to artistList
    const filteredArtists = [];
    for (let key in artists) {
      if (artists.hasOwnProperty(key)) {
        const artist = artists[key];
        if (artist.name.toLowerCase().includes(value)
          || (artist.othernames && artist.othernames.toLowerCase().includes(value))
          ) {
          filteredArtists.push(artist.id);
        }
      }
    }
    dispatch(setArtistsList(filteredArtists));
  }
};
