import types from './types';

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
    case types.SET_TEST_1:
      newState.test1 = action.payload;
      break;

    case types.SET_TEST_2:
      newState.test2 = action.payload;
      break;

    case types.SET_TEST_3:
      newState.test3 = action.payload;
      break;

    case types.SET_TEST_4:
      newState.test4 = action.payload;
      break;

    case types.SET_TEST_5:
      newState.test5 = action.payload;
      break;

    default:
      return prevState;
  }

  return newState;
}
