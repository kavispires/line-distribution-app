import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import registerServiceWorker from './registerServiceWorker';
import store from './store';

import AppContainer from './containers/AppContainer';

import './stylesheets/index.css';

ReactDOM.render(
	<Provider store={store}>
		<AppContainer />
	</Provider>, document.getElementById('root'));
registerServiceWorker();
