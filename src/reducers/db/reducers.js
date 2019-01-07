import types from './types';

const initialState = {
  colors: {},
};

export default function reducer(prevState = initialState, action) {
  const newState = Object.assign({}, prevState);

  switch (action.type) {
    case types.SET_COLORS:
      newState.colors = action.payload;
      break;

    default:
      return prevState;
  }

  return newState;
}
