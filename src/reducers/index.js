import { combineReducers } from 'redux';

import { reducer as toastr } from 'react-redux-toastr';

import admin from './admin';
import app from './app';
import artists from './artists';
import auth from './auth';
import creator from './creator';
import database from './database';
import db from './db';
import distribute from './distribute';
import lyrics from './lyrics';
import results from './results';
import songs from './songs';
import sync from './sync';
import test from './test';

const rootReducer = combineReducers({
  admin,
  app,
  artists,
  auth,
  creator,
  database,
  db,
  distribute,
  lyrics,
  results,
  songs,
  sync,
  test,
  toastr,
});

export default rootReducer;
