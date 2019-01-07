import types from './types';

const initialState = {
  databaseReady: false,
  isLoading: false,
};

export default function reducer(prevState = initialState, action) {
  const newState = Object.assign({}, prevState);

  switch (action.type) {
    case types.SET_DATABASE_READY:
      newState.databaseReady = action.payload;
      break;

    case types.SET_IS_LOADING:
      newState.isLoading = action.payload;
      break;

    default:
      return prevState;
  }

  return newState;
}
