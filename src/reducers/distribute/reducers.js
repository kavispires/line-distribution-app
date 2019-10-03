import types from './types';

import mockData from './mock-data';

const initialState = {
  activeMemberPill: '',
  activeDistribution: {},
  activeSong: {},
  activeUnit: {},
  category: 'OFFICIAL',
  distributeView: 'view',
  distributionLines: [],
  rates: {},
  remainder: 100,
  timestampsDict: {},
  // TO-DO: Remove or comment out to deploy
  ...mockData,
};

export default function reducer(prevState = initialState, action) {
  let newState = Object.assign({}, prevState);

  switch (action.type) {
    case types.RESET_DISTRIBUTE:
      newState = Object.assign({}, initialState);
      break;

    case types.RESET_DISTRIBUTE_SONG:
      newState = Object.assign({}, initialState);
      newState.activeUnit = Object.assign({}, prevState.activeUnit);
      break;

    case types.SET_ACTIVE_DISTRIBUTION:
      newState.activeDistribution = action.payload;
      break;

    case types.SET_ACTIVE_MEMBER_PILL:
      newState.activeMemberPill = action.payload;
      break;

    case types.SET_ACTIVE_SONG:
      newState.activeSong = action.payload;
      break;

    case types.SET_ACTIVE_UNIT:
      newState.activeUnit = action.payload;
      break;

    case types.SET_DISTRIBUTE_VIEW:
      newState.distributeView = action.payload;
      break;

    case types.SET_DISTRIBUTION_CATEGORY:
      newState.category = action.payload;
      break;

    case types.SET_DISTRIBUTION_LINES:
      newState.distributionLines = action.payload;
      break;

    case types.SET_RATES:
      newState.rates = action.payload;
      break;

    case types.SET_DISTRIBUTION_REMAINDER:
      newState.remainder = action.payload;
      break;

    case types.SET_TIMESTAMPS_DICT:
      newState.timestampsDict = action.payload;
      break;

    default:
      return prevState;
  }

  return newState;
}
