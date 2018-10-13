import create from '../api/create';
import mockDB from '../mock/mock_db';

/* ------------------   ACTIONS   ------------------ */

const SET_TEST_1 = 'SET_TEST_1';
const SET_TEST_2 = 'SET_TEST_2';
const SET_TEST_3 = 'SET_TEST_3';

/* --------------   ACTION CREATORS   -------------- */

export const setTest1 = payload => dispatch =>
  dispatch({ type: SET_TEST_1, payload });
export const setTest2 = payload => dispatch =>
  dispatch({ type: SET_TEST_2, payload });
export const setTest3 = payload => dispatch =>
  dispatch({ type: SET_TEST_3, payload });

/* -----------------   REDUCERS   ------------------ */

const initialState = {
  test1: ' ',
  test2: '',
  test3: '',
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

    default:
      return prevState;
  }

  return newState;
}

/* ---------------   DISPATCHERS   ----------------- */

export const testFunction = () => async dispatch => {
  console.log('===== Running test =====');

  const body = {
    name: `Test ${Date.now()}`,
  };

  const response = await create('/artists/', body, mockDB);

  console.log(response);
  dispatch(setTest1(response.id));

  console.log('/===== Done running test =====');
};
