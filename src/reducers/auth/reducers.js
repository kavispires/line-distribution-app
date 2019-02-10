import types from './types';

const initialState = {
  isAuthenticated: false,
  isAdmin: false,
  user: {},
};

export default function reducer(prevState = initialState, action) {
  const newState = Object.assign({}, prevState);

  switch (action.type) {
    case types.SET_ADMIN:
      newState.isAdmin = action.payload;
      break;

    case types.SET_AUTHENTICATED:
      newState.isAuthenticated = action.payload;
      break;

    case types.SET_BIASES:
      newState.user.biases = action.payload;
      break;

    case types.SET_USER:
      newState.user = action.payload;
      break;

    default:
      return prevState;
  }

  return newState;
}
