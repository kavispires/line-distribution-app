import types from './types';

const initialState = {
  activeSong: {},
};

export default function reducer(prevState = initialState, action) {
  const newState = Object.assign({}, prevState);

  switch (action.type) {
    case types.SET_ACTIVE_SONG:
      newState.activeSong = action.payload;
      break;

    default:
      return prevState;
  }

  return newState;
}
