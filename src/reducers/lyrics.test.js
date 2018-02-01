import configureMockStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './index';

// import { combineReducers } from 'redux';

// import app from './app';
// import creator from './creator';
// import database from './database';
// import distribute from './distribute';
// import lyrics from './lyrics';
// import results from './results';

// const rootReducer = combineReducers({
//   app,
//   creator,
//   database,
//   distribute,
//   lyrics,
//   results,
// });

const middleware = [thunkMiddleware];
const mockStore = configureMockStore(rootReducer, middleware);



// import { createStore, applyMiddleware } from 'redux';
// import { composeWithDevTools } from 'redux-devtools-extension';




// import * as action from './lyrics';
// import { setArtists, setCurrentBand } from './app';

describe('Lyrics Parser', () => {
  let testStore;
  beforeEach(() => {
    console.log('bola');
  });

  var a = 1;
  it('Test', () => {
    expect(1 == a);
  });
});

// // import React from 'react';
// // import ReactDOM from 'react-dom';
// // import { Provider } from 'react-redux';

// import store from './../store';
// import routes from './../routes';

// console.log(store)
// console.log(routes);

// it('renders without crashing', () => {
//   const div = document.createElement('div');
//   ReactDOM.render(<Provider store={store}>{routes}</Provider>, div);
// });
