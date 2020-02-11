import types from './types';

const initialState = {
  isDatabaseReady: false,
  error: false,
  errorInline: false,
  errorMessage: '',
  pending: {},
  isLoading: false,
};

export default function reducer(prevState = initialState, action) {
  const newState = Object.assign({}, prevState);

  switch (action.type) {
    case types.RESET_ERROR:
      newState.error = false;
      newState.errorInline = false;
      newState.errorMessage = '';
      break;

    case types.SET_DATABASE_READY:
      newState.isDatabaseReady = action.payload;
      break;

    case types.SET_ERROR:
      newState.error = action.payload;
      break;

    case types.SET_ERROR_INLINE:
      newState.errorInline = action.payload;
      break;

    case types.SET_ERROR_MESSAGE:
      newState.errorMessage = action.payload;
      break;

    case types.SET_PENDING:
      newState.pending = action.payload;
      newState.isLoading = Object.keys(action.payload).length > 0;
      break;

    case types.SET_SUCCESS:
      newState.success = action.payload;
      break;

    default:
      return prevState;
  }

  return newState;
}
