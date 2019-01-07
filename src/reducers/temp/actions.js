import types from './types';

const setTest1 = payload => dispatch =>
  dispatch({ type: types.SET_TEST_1, payload });
const setTest2 = payload => dispatch =>
  dispatch({ type: types.SET_TEST_2, payload });
const setTest3 = payload => dispatch =>
  dispatch({ type: types.SET_TEST_3, payload });
const setTest4 = payload => dispatch =>
  dispatch({ type: types.SET_TEST_4, payload });
const setTest5 = payload => dispatch =>
  dispatch({ type: types.SET_TEST_5, payload });

export default {
  setTest1,
  setTest2,
  setTest3,
  setTest4,
  setTest5,
};
