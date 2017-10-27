/* ------------------   ACTIONS   ------------------ */

const SET_RESULTS = 'SET_RESULTS';
const SET_RESULT_TYPE = 'SET_RESULT_TYPE';

/* --------------   ACTION CREATORS   -------------- */

export const setResults = payload => dispatch => dispatch({ type: SET_RESULTS, payload });
export const setResultType = payload => dispatch => dispatch({ type: SET_RESULT_TYPE, payload });

/* -----------------   REDUCERS   ------------------ */

const initialState = {
  results: [],
  showPercentage: false
};

export default function reducer(prevState = initialState, action) {

  const newState = Object.assign({}, prevState);

  switch (action.type) {

    case SET_RESULTS:
      newState.results = action.payload;
      break;

    case SET_RESULT_TYPE:
      newState.showPercentage = action.payload;
      break;

    default:
      return prevState;

  }

  return newState;

}

/* ---------------   DISPATCHERS   ----------------- */

export const calculateResults = () => (dispatch, getState) => {
  const durations = [...getState().distribute.durations];
  const percentages = [...getState().distribute.percentages];
  const currentBand = Object.assign({}, getState().app.currentBand);
  // Find Max value
  const max = Math.max.apply(null, durations);
  // Sort durations
  const sortedDurations = [...durations].sort((a, b) => b - a);
  // Push results in order with relative percentage
  const results = [];
  sortedDurations.forEach((val, i) => {
    const index = durations.indexOf(val);
    const relativePercentage = Math.round((durations[index] * 100) / max);
    const member = {
      name: currentBand.members[index],
      color: currentBand.colors[index],
      relativePercentage: relativePercentage,
      percentage: percentages[index],
      duration: durations[index]
    };
    results.push(member);
    durations[index] = null;
    sortedDurations[i] = null;
  });
  dispatch(setResults(results));
};

export const handleSwitch = () => (dispatch, getState) => {
  dispatch(setResultType(!getState().creator.showPercentage));
};
