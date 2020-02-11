import types from './types';

import {
  RequestService,
  UserRequestService,
} from '../../utils/request-service';
import API from '../../api2';

const initialState = {
  artists: new RequestService('artist', '/artists', API),
  colors: new RequestService('color', '/colors', API),
  distributions: new RequestService('distribution', '/distributions', API),
  members: new RequestService('member', '/members', API),
  songs: new RequestService('song', '/songs', API),
  units: new RequestService('unit', '/units', API),
  user: new UserRequestService('user', '/users', API),
  test: new RequestService('artist', '/artists', API),
};

export default function reducer(prevState = initialState, action) {
  const newState = Object.assign({}, prevState);

  switch (action.type) {
    case types.SET_ARTISTS:
      newState.artists = action.payload;
      newState.reload.artists = false;
      break;

    case types.SET_ARTISTS_TYPEAHEAD:
      newState.typeahead.artists = action.payload;
      break;

    case types.SET_COLORS:
      newState.colors = action.payload;
      newState.reload.colors = false;
      break;

    case types.SET_DB_RELOAD:
      newState.reload = {
        ...newState.reload,
        ...action.payload,
      };
      break;

    case types.SET_MEMBERS:
      newState.members = action.payload;
      newState.reload.members = false;
      break;

    case types.SET_MEMBERS_TYPEAHEAD:
      newState.typeahead.members = action.payload;
      break;

    case types.SET_SONGS:
      newState.songs = action.payload;
      newState.reload.songs = false;
      break;

    case types.SET_UNIT_TYPEAHEAD:
      newState.typeahead.units = action.payload;
      break;

    default:
      return prevState;
  }
  return newState;
}

function determineIsLoading(state) {
  return Object.values(state).some(item => item.isPending);
}
