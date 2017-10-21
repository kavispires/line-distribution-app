import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import registerServiceWorker from './registerServiceWorker';
import store from './store';

import Header from './components/Header';

import AppContainer from './containers/AppContainer';
import ArtistsContainer from './containers/ArtistsContainer';
import ColorSheetContainer from './containers/ColorSheetContainer';
import CreatorContainer from './containers/CreatorContainer';
import DistributeContainer from './containers/DistributeContainer';
import HomeContainer from './containers/HomeContainer';
import LyricsContainer from './containers/LyricsContainer';

import './stylesheets/index.css';

ReactDOM.render(
	<Provider store={store}>
		<Router>
			<div className="app">
				<Header />
				<Route path="/" component={AppContainer} />
				<Route path="/artists" component={ArtistsContainer} />
				<Route path="/distribute" component={DistributeContainer} />
				<Route path="/create" component={CreatorContainer} />
				<Route path="/lyrics" component={LyricsContainer} />
				<Route path="/colorsheet" component={ColorSheetContainer} />
				<Route exact path="/" component={HomeContainer} />
			</div>
		</Router>
	</Provider>, document.getElementById('root'));
registerServiceWorker();
