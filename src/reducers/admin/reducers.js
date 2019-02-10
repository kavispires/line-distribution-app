import types from './types';

const initialState = {
  colors: {},
  uiReferenceTab: null,
};

export default function reducer(prevState = initialState, action) {
  const newState = Object.assign({}, prevState);

  switch (action.type) {
    case types.SET_COLORS:
      newState.colors = action.payload;
      break;

    case types.SET_UI_REFERENCE_TAB:
      newState.uiReferenceTab = action.payload;
      break;

    default:
      return prevState;
  }

  return newState;
}
