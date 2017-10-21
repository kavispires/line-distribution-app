/* ------------------   ACTIONS   ------------------ */

const SET_MODE = 'SET_MODE';

/* --------------   ACTION CREATORS   -------------- */

export const setMode = payload => dispatch => dispatch({ type: SET_MODE, payload });


/* -----------------   REDUCERS   ------------------ */

const initialState = {
  mode: '',
  newSession: true,
  scorerSession: false,
  solitaireSession: false,
};

export default function reducer(prevState = initialState, action) {

  const newState = Object.assign({}, prevState);

  switch (action.type) {

    case SET_MODE:
      newState.mode = action.payload;
      break;

    default:
      return prevState;

  }

  return newState;

}

/* ---------------   DISPATCHERS   ----------------- */

export const selectMode = (event) => (dispatch) => {
  const [action, mode] = event.target.name.split('-');
  dispatch(setMode(mode));
};
