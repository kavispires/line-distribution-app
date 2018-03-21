import _ from 'lodash';

/* ------------------   ACTIONS   ------------------ */

const SET_OUTPUT = 'SET_OUTPUT';

/* --------------   ACTION CREATORS   -------------- */

export const setOutput = payload => dispatch => dispatch({ type: SET_OUTPUT, payload });

/* -----------------   REDUCERS   ------------------ */

const initialState = {
  outputObject: {},
  output: '',
};

export default function reducer(prevState = initialState, action) {
  const newState = Object.assign({}, prevState);

  switch (action.type) {
    case SET_OUTPUT:
      newState.output = action.payload;
      break;


    default:
      return prevState;
  }

  return newState;
}

/* ---------------   DISPATCHERS   ----------------- */

export const selectAction = event => (dispatch) => {
  const { value } = event.target;

  if (value === 'reassign-songs-member-ids') {
    dispatch(reassignMemberIds());
  }
};

export const reassignMemberIds = () => (dispatch, getState) => {

  const ALL_SONGS = _.cloneDeep(getState().database.songs);

  // Loop through all song objects, get members from units and replace ids for real ids
  Object.keys(ALL_SONGS).forEach((songId) => {
    const SONG = ALL_SONGS[songId];
    const UNIT_MEMBERS = getState().database.units[SONG.unitId].members;
    SONG.distribution.forEach((instance) => {
      instance.memberId = UNIT_MEMBERS[instance.memberId];
    });
  });

  const stringifiedSongs = JSON.stringify(ALL_SONGS);

  dispatch(setOutput(stringifiedSongs));
};

