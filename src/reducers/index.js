import { combineReducers } from 'redux';

import { reducer as toastr } from 'react-redux-toastr';

import app, { appTypes } from './app';
import artists, { artistsTypes } from './artists';
import auth, { authTypes } from './auth';
import db, { dbTypes } from './db';
import temp, { tempTypes } from './temp';

const rootReducer = combineReducers({
  app,
  auth,
  artists,
  db,
  temp,
  toastr,
});

export const types = {
  ...appTypes,
  ...artistsTypes,
  ...authTypes,
  ...dbTypes,
  ...tempTypes,
};

export default rootReducer;
