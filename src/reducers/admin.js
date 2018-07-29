import API from '../api';
import romanize from '../utils/romanize';

/* ------------------   ACTIONS   ------------------ */

const SET_ADMIN_TOOLS = 'SET_ADMIN_TOOLS';
const SET_ARTISTS = 'SET_ARTISTS';
const SET_COLOR_COUNT = 'SET_COLOR_COUNT';
const SET_COLORS = 'SET_COLORS';
const SET_COLOR_SHEET_TAB = 'SET_COLOR_SHEET_TAB';
const SET_HANGUL = 'SET_HANGUL';
const SET_MEMBERS = 'SET_MEMBERS';
const SET_POSITIONS = 'SET_POSITIONS';
const SET_ROMANIZATION_RESULT = 'SET_ROMANIZATION_RESULT';
const SET_ROMANIZATION_TYPE = 'SET_ROMANIZATION_TYPE';
const SET_UNITS = 'SET_UNITS';

/* --------------   ACTION CREATORS   -------------- */

export const setAdminTools = payload => dispatch =>
  dispatch({ type: SET_ADMIN_TOOLS, payload });
export const setArtists = payload => dispatch =>
  dispatch({ type: SET_ARTISTS, payload });
export const setColorCount = payload => dispatch =>
  dispatch({ type: SET_COLOR_COUNT, payload });
export const setColors = payload => dispatch =>
  dispatch({ type: SET_COLORS, payload });
export const setColorSheetTab = payload => dispatch =>
  dispatch({ type: SET_COLOR_SHEET_TAB, payload });
export const setHangul = payload => dispatch =>
  dispatch({ type: SET_HANGUL, payload });
export const setMembers = payload => dispatch =>
  dispatch({ type: SET_MEMBERS, payload });
export const setPositions = payload => dispatch =>
  dispatch({ type: SET_POSITIONS, payload });
export const setRomanizationResult = payload => dispatch =>
  dispatch({ type: SET_ROMANIZATION_RESULT, payload });
export const setRomanizationType = payload => dispatch =>
  dispatch({ type: SET_ROMANIZATION_TYPE, payload });
export const setUnits = payload => dispatch =>
  dispatch({ type: SET_UNITS, payload });

/* -----------------   REDUCERS   ------------------ */

const initialState = {
  adminTools: false,
  artists: {},
  colorCount: {},
  colors: {},
  colorSheetTab: 'list',
  hangul: '한 겹 두 겹 칠해져 가네\n여기저기 새겨져 가네\n계속 나를 칠해줘',
  members: {},
  positions: {},
  romanizationResult: '',
  romanizationType: 'portuguese',
  units: {},
};

export default function reducer(prevState = initialState, action) {
  const newState = Object.assign({}, prevState);

  switch (action.type) {
    case SET_ADMIN_TOOLS:
      newState.adminTools = action.payload;
      break;

    case SET_ARTISTS:
      newState.artists = action.payload;
      break;

    case SET_COLOR_COUNT:
      newState.colorCount = action.payload;
      break;

    case SET_COLORS:
      newState.colors = action.payload;
      break;

    case SET_COLOR_SHEET_TAB:
      newState.colorSheetTab = action.payload;
      break;

    case SET_HANGUL:
      newState.hangul = action.payload;
      break;

    case SET_MEMBERS:
      newState.members = action.payload;
      break;

    case SET_POSITIONS:
      newState.positions = action.payload;
      break;

    case SET_ROMANIZATION_RESULT:
      newState.romanizationResult = action.payload;
      break;

    case SET_ROMANIZATION_TYPE:
      newState.romanizationType = action.payload;
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

export const initColorSheet = () => dispatch => {
  const colors = API.get('/colors');
  dispatch(setColors(colors));
  const count = API.get('/colors/count');
  dispatch(setColorCount(count));
};

export const toggleColorSheetTab = event => dispatch => {
  const { id } = event.target;
  dispatch(setColorSheetTab(id));
};

export const fetchCompleteDatabase = () => dispatch => {
  // Get Artists
  const artists = API.get('/artists');
  dispatch(setArtists(artists));
  // Get Units
  const units = API.get('/units');
  dispatch(setUnits(units));
  // Get Members
  const members = API.get('/members');
  dispatch(setMembers(members));
  // Get Colors
  dispatch(initColorSheet());
  // Get Positions
  const positions = API.get('/positions');
  dispatch(setPositions(positions));
};

export const toggleAdminTools = () => (dispatch, getState) => {
  const { adminTools } = getState().admin;
  return dispatch(setAdminTools(!adminTools));
};

export const updateRomanizationType = event => dispatch => {
  const { value } = event.target;
  dispatch(setRomanizationType(value));
  dispatch(updateRomanizationResults(null, value));
};

export const updateRomanizationResults = (event, type) => (
  dispatch,
  getState
) => {
  let str;
  if (event) {
    str = event.target.value;
    dispatch(setHangul(str));
  } else {
    str = getState().admin.hangul;
  }
  if (!type) {
    type = getState().admin.romanizationType;
  }
  const result = romanize(str, type);
  dispatch(setRomanizationResult(result));
};
