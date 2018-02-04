import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import registerServiceWorker from './registerServiceWorker';
import store from './store';
import routes from './routes';

import './stylesheets/index.css';

ReactDOM.render(
  <Provider store={store}>
    { routes}
  </Provider>, document.getElementById('root'));
registerServiceWorker();
