import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import registerServiceWorker from './registerServiceWorker';
import store from './store';

import Header from './components/Header';

import AppContainer from './containers/AppContainer';
import ColorSheetContainer from './containers/ColorSheetContainer';

import './stylesheets/index.css';

console.log(Router);

ReactDOM.render(
	<Provider store={store}>
		<Router>
			<div>
				<Header />
				<Route exact path="/" component={AppContainer} />
				<Route path="/artists" component={AppContainer} />
				<Route path="/distribute" component={AppContainer} />
				<Route path="/create" component={AppContainer} />
				<Route path="/lyrics" component={AppContainer} />
				<Route path="/colorsheet" component={ColorSheetContainer} />
			</div>
		</Router>
	</Provider>, document.getElementById('root'));
registerServiceWorker();
