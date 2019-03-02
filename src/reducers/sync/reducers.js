import types from './types';

const initialState = {
  videoId: '',
};

export default function reducer(prevState = initialState, action) {
  const newState = Object.assign({}, prevState);

  switch (action.type) {
    case types.SET_VIDEO_ID:
      newState.videoId = action.payload;
      break;

    default:
      return prevState;
  }

  return newState;
}
