
import API from '../api';

/* ------------------   ACTIONS   ------------------ */

const SET_COLOR_COUNT = 'SET_COLOR_COUNT';
const SET_COLORS = 'SET_COLORS';
const SET_COLOR_SHEET_TAB = 'SET_COLOR_SHEET_TAB';

/* --------------   ACTION CREATORS   -------------- */

export const setColorCount = payload => dispatch => dispatch({ type: SET_COLOR_COUNT, payload });
export const setColors = payload => dispatch => dispatch({ type: SET_COLORS, payload });
export const setColorSheetTab = payload => dispatch => dispatch({ type: SET_COLOR_SHEET_TAB, payload });

/* -----------------   REDUCERS   ------------------ */

const initialState = {
  colorCount: {},
  colors: {},
  colorSheetTab: 'list',
};

export default function reducer(prevState = initialState, action) {
  const newState = Object.assign({}, prevState);

  switch (action.type) {
    case SET_COLOR_COUNT:
      newState.colorCount = action.payload;
      break;

    case SET_COLORS:
      newState.colors = action.payload;
      break;

    case SET_COLOR_SHEET_TAB:
      newState.colorSheetTab = action.payload;
      break;

    default:
      return prevState;
  }

  return newState;
}

/* ---------------   DISPATCHERS   ----------------- */

export const initColorSheet = () => (dispatch) => {
  const colors = API.get('/colors');
  dispatch(setColors(colors));
  const count = API.get('/colors/count');
  dispatch(setColorCount(count));
};

export const toggleColorSheetTab = event => (dispatch) => {
  const { id } = event.target;
  dispatch(setColorSheetTab(id));
};
