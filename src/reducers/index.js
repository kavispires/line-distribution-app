import { combineReducers } from 'redux';

import { reducer as toastr } from 'react-redux-toastr';

import app, { appTypes } from './app';
import admin, { adminTypes } from './admin';
import artists, { artistsTypes } from './artists';
import auth, { authTypes } from './auth';
import temp, { tempTypes } from './temp';

const rootReducer = combineReducers({
  app,
  admin,
  auth,
  artists,
  temp,
  toastr,
});

export const types = {
  ...appTypes,
  ...adminTypes,
  ...artistsTypes,
  ...authTypes,
  ...tempTypes,
};

export default rootReducer;
