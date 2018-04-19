import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import App from '../components/App';

import { loadLocalStorage } from '../utils';

import {
	artistsfilter,
  init,
} from '../reducers/app';

import {
  handleParser,
} from '../reducers/lyrics';

import {
  handleReset,
} from '../reducers/distribute';

const mapStateToProps = state => ({ app: state.app, database: state.database });

const mapDispatchToProps = {
  artistsfilter,
  init,
  handleParser,
  handleReset,
  loadLocalStorage,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
