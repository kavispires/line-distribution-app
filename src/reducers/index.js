import { combineReducers } from 'redux';

import admin from './admin';
import app from './app';
import artists from './artists';
import creator from './creator';
import converter from './converter';
import database from './database';
import db from './db';
import distribute from './distribute';
import lyrics from './lyrics';
import results from './results';
import songs from './songs';
import user from './user';

const rootReducer = combineReducers({
  admin,
  app,
  artists,
  creator,
  converter,
  database,
  db,
  distribute,
  lyrics,
  results,
  songs,
  user,
});

export default rootReducer;
