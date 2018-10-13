import { combineReducers } from 'redux';

import { reducer as toastr } from 'react-redux-toastr';

const rootReducer = combineReducers({
  toastr,
});

export default rootReducer;
