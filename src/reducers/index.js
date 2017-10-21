import { combineReducers } from 'redux';

const rootReducer = combineReducers({
	app: require('./app').default
});

export default rootReducer;
