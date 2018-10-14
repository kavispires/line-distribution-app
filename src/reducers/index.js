import { combineReducers } from 'redux';

import { reducer as toastr } from 'react-redux-toastr';

import app from './app';
import auth from './auth';

const rootReducer = combineReducers({
  toastr,
});

export default rootReducer;
