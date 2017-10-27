import { combineReducers } from 'redux';

const rootReducer = combineReducers({
	app: require('./app').default,
	creator: require('./creator').default,
	distribute: require('./distribute').default,
	results: require('./results').default
});

export default rootReducer;
