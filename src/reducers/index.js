import { combineReducers } from 'redux';

import app from './app';
import creator from './creator';
import converter from './converter';
import database from './database';
import distribute from './distribute';
import lyrics from './lyrics';
import results from './results';

const rootReducer = combineReducers({
  app,
  creator,
  converter,
  database,
  distribute,
  lyrics,
  results,
});

export default rootReducer;
