/* ------------------   ACTIONS   ------------------ */

const SET_TEST_1 = 'SET_TEST_1';
const SET_TEST_2 = 'SET_TEST_2';
const SET_TEST_3 = 'SET_TEST_3';
const SET_TEST_4 = 'SET_TEST_4';
const SET_TEST_5 = 'SET_TEST_5';

/* --------------   ACTION CREATORS   -------------- */

export const setTest1 = payload => dispatch =>
  dispatch({ type: SET_TEST_1, payload });
export const setTest2 = payload => dispatch =>
  dispatch({ type: SET_TEST_2, payload });
export const setTest3 = payload => dispatch =>
  dispatch({ type: SET_TEST_3, payload });
export const setTest4 = payload => dispatch =>
  dispatch({ type: SET_TEST_4, payload });
export const setTest5 = payload => dispatch =>
  dispatch({ type: SET_TEST_5, payload });

/* -----------------   REDUCERS   ------------------ */

const initialState = {
  test1: '',
  test2: 0,
  test3: true,
  test4: [],
  test5: {},
};

export default function reducer(prevState = initialState, action) {
  const newState = Object.assign({}, prevState);

  switch (action.type) {
    case SET_TEST_1:
      newState.test1 = action.payload;
      break;

    case SET_TEST_2:
      newState.test2 = action.payload;
      break;

    case SET_TEST_3:
      newState.test3 = action.payload;
      break;

    case SET_TEST_4:
      newState.test4 = action.payload;
      break;

    case SET_TEST_5:
      newState.test5 = action.payload;
      break;

    default:
      return prevState;
  }

  return newState;
}

/* ---------------   DISPATCHERS   ----------------- */

export const testFunction1 = () => async (dispatch, getState) => {
  console.log('test!!');
};
