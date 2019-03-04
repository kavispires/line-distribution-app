import types from './types';

const initialState = {
  activeLine: null,
  activePill: null,
  areLyricsLocked: false,
  distributionLines: [],
  finalLyrics: '',
  info: {},
  isDistributionComplete: false,
  linkSequenceMode: false,
  lastIdNum: 0,
  lyrics: '',
  pills: {},
  queue: {},
  step: 1,
  steps: {
    1: {
      locked: false,
      expanded: true,
    },
    2: {
      locked: true,
      expanded: false,
    },
    3: {
      locked: true,
      expanded: false,
    },
    4: {
      locked: true,
      expanded: false,
    },
    5: {
      locked: true,
      expanded: false,
    },
  },
  stats: {
    lines: 0,
    pills: 0,
    linked: 0,
  },
  timestamps: {},
  videoId: '',
};

export default function reducer(prevState = initialState, action) {
  let newState = Object.assign({}, prevState);

  switch (action.type) {
    case types.RESET_SYNC:
      newState = Object.assign({}, initialState);
      break;

    case types.SET_ACTIVE_LINE:
      newState.activeLine = action.payload;
      break;

    case types.SET_ACTIVE_PILL:
      newState.activePill = action.payload;
      break;

    case types.SET_ARE_LYRICS_LOCKED:
      newState.areLyricsLocked = action.payload;
      break;

    case types.SET_FINAL_LYRICS:
      newState.finalLyrics = action.payload;
      break;

    case types.SET_INFO:
      newState.info = action.payload;
      break;

    case types.SET_IS_DISTRIBUTION_COMPLETE:
      newState.isDistributionComplete = action.payload;
      break;

    case types.SET_LINK_SEQUENCE_MODE:
      newState.linkSequenceMode = action.payload;
      break;

    case types.SET_LAST_ID_NUM:
      newState.lastIdNum = action.payload;
      break;

    case types.SET_LYRICS:
      newState.lyrics = action.payload;
      break;

    case types.SET_PILLS:
      newState.pills = action.payload;
      break;

    case types.SET_QUEUE:
      newState.queue = action.payload;
      break;

    case types.SET_STEP:
      newState.step = action.payload;
      break;

    case types.SET_STEPS:
      newState.steps = action.payload;
      break;

    case types.SET_SYNC_DISTRIBUTION_LINES:
      newState.distributionLines = action.payload;
      break;

    case types.SET_SYNC_STATS:
      newState.stats = action.payload;
      break;

    case types.SET_TIMESTAMPS:
      newState.timestamps = action.payload;
      break;

    case types.SET_VIDEO_ID:
      newState.videoId = action.payload;
      break;

    default:
      return prevState;
  }

  return newState;
}
