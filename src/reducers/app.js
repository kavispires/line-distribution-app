/* ------------------   ACTIONS   ------------------ */

const SET_IS_LOADING = 'SET_IS_LOADING';

/* --------------   ACTION CREATORS   -------------- */

export const setIsLoading = payload => dispatch =>
  dispatch({ type: SET_IS_LOADING, payload });

/* -----------------   REDUCERS   ------------------ */

const initialState = {
  isLoading: false,
};

export default function reducer(prevState = initialState, action) {
  const newState = Object.assign({}, prevState);

  switch (action.type) {
    case SET_IS_LOADING:
      newState.isLoading = action.payload;
      break;

    default:
      return prevState;
  }

  return newState;
}

/* ---------------   DISPATCHERS   ----------------- */

let dictArray = [];

export const setLoading = (value, instance) => dispatch => {
  // Check if value and instance were passed as argument
  if (typeof instance !== 'string') {
    return console.error('Missing instance string');
  }
  if (typeof value !== 'boolean') {
    return console.error('Missing boolean value string');
  }
  // Check if dict has instance
  const index = dictArray.indexOf(instance);
  // Instance does not exsist
  if (index === -1 && value) {
    dictArray.push(instance);
    dispatch(setIsLoading(true));
    console.log('LOADING IS ON');
  }
  // Instance exists
  else if (index > -1 && !value) {
    dictArray.splice(index, 1);
  }
  // When dictarray is empty
  if (dictArray.length === 0) {
    dispatch(setIsLoading(false));
    console.log('LOADING IS OFF');
  }
};
