import { combineReducers } from 'redux';

const rootReducer = combineReducers({
	app: require('./app').default,
	distribute: require('./distribute').default
});

export default rootReducer;
