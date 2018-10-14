import { combineReducers } from 'redux';

import { reducer as toastr } from 'react-redux-toastr';

import app from './app';

const rootReducer = combineReducers({
  app,
  toastr,
});

export default rootReducer;
