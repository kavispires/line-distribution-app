import { combineReducers } from 'redux';

import { reducer as toastr } from 'react-redux-toastr';

import admin from './admin';
import app from './app';
import artists from './artists';
import auth from './auth';
import db from './db';

const rootReducer = combineReducers({
  admin,
  app,
  auth,
  artists,
  db,
  toastr,
});

export default rootReducer;
