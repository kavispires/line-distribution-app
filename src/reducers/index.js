import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  app: require('./app').default,
  creator: require('./creator').default,
  database: require('./database').default,
  distribute: require('./distribute').default,
  lyrics: require('./lyrics').default,
  results: require('./results').default
});

export default rootReducer;
