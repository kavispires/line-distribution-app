import API from '../api';

/* ------------------   ACTIONS   ------------------ */

const SET_ARTISTS = 'SET_ARTISTS';
const SET_COLORS = 'SET_COLORS';
const SET_DISPLAY = 'SET_DISPLAY';
const SET_DISPLAY_SELECT = 'SET_DISPLAY_SELECT';
const SET_INCLUDE_DEPENDENCIES = 'SET_INCLUDE_DEPENDENCIES';
const SET_MEMBERS = 'SET_MEMBERS';
const SET_POSITIONS = 'SET_POSITIONS';
const SET_SONGS = 'SET_SONGS';
const SET_UNITS = 'SET_UNITS';
const SET_TAB = 'SET_TAB';

/* --------------   ACTION CREATORS   -------------- */

export const setArtists = payload => dispatch => dispatch({ type: SET_ARTISTS, payload });
export const setColors = payload => dispatch => dispatch({ type: SET_COLORS, payload });
export const setDisplay = payload => dispatch => dispatch({ type: SET_DISPLAY, payload });
export const setDisplaySelect = payload => dispatch => dispatch({ type: SET_DISPLAY_SELECT, payload });
export const setIncludeDependencies = payload => dispatch => dispatch({ type: SET_INCLUDE_DEPENDENCIES, payload });
export const setMembers = payload => dispatch => dispatch({ type: SET_MEMBERS, payload });
export const setPositions = payload => dispatch => dispatch({ type: SET_POSITIONS, payload });
export const setSongs = payload => dispatch => dispatch({ type: SET_SONGS, payload });
export const setUnits = payload => dispatch => dispatch({ type: SET_UNITS, payload });
export const setTab = payload => dispatch => dispatch({ type: SET_TAB, payload });

/* -----------------   REDUCERS   ------------------ */

const initialState = {
  artists: {},
  colors: {},
  display: {},
  displaySelect: '',
  includeDependencies: false,
  members: {},
  positions: {},
  songs: {},
  tab: 'list',
  units: {},
};

export default function reducer(prevState = initialState, action) {
  const newState = Object.assign({}, prevState);

  switch (action.type) {
    case SET_ARTISTS:
      newState.artists = action.payload;
      break;

    case SET_COLORS:
      newState.colors = action.payload;
      break;

    case SET_DISPLAY:
      newState.display = action.payload;
      break;

    case SET_DISPLAY_SELECT:
      newState.displaySelect = action.payload;
      break;

    case SET_INCLUDE_DEPENDENCIES:
      newState.includeDependencies = action.payload;
      break;

    case SET_MEMBERS:
      newState.members = action.payload;
      break;

    case SET_POSITIONS:
      newState.positions = action.payload;
      break;

    case SET_SONGS:
      newState.songs = action.payload;
      break;

    case SET_TAB:
      newState.tab = action.payload;
      break;

    case SET_UNITS:
      newState.units = action.payload;
      break;

    default:
      return prevState;
  }

  return newState;
}

/* ---------------   DISPATCHERS   ----------------- */

export const initDatabase = () => (dispatch) => {
  const artists = API.get('/artists');
  dispatch(setArtists(artists));
  const colors = API.get('/colors');
  dispatch(setColors(colors));
  const members = API.get('/members');
  dispatch(setMembers(members));
  const positions = API.get('/positions');
  dispatch(setPositions(positions));
  const songs = API.get('/songs');
  dispatch(setSongs(songs));
  const units = API.get('/units');
  dispatch(setUnits(units));
};

export const handleDisplay = event => (dispatch, getState) => {
  const { value } = event.target;
  const includeDependencies = getState().database.includeDependencies ? '/all' : '';

  let result;

  switch (value) {
    case 'artists':
      result = API.get(`/artists${includeDependencies}`);
      break;

    case 'colors':
      result = API.get('/colors');
      break;

    case 'members':
      result = API.get(`/members${includeDependencies}`);
      break;

    case 'positions':
      result = API.get('/positions');
      break;

    case 'songs':
      result = API.get(`/songs${includeDependencies}`);
      break;

    case 'units':
      result = API.get(`/units${includeDependencies}`);
      break;

    default:
      result = '';
  }

  dispatch(setDisplay(result));
};

export const toggleIncludeDependencies = event => (dispatch) => {
  const { checked } = event.target;
  dispatch(setIncludeDependencies(checked));
};

export const toggleTab = event => (dispatch) => {
  const { id } = event.target;
  dispatch(setTab(id));
};
