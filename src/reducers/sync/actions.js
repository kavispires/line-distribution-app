import types from './types';

const setVideoId = payload => dispatch =>
  dispatch({ type: types.SET_VIDEO_ID, payload });

export default {
  setVideoId,
};
